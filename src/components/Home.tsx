import React, {FC, useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Button,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import DropDown from './DropDown';
import Chart from './Chart';
import SwitchItem from './SwitchItem';
import ChartType from '../enum/chart';
import {Country, ChartProps, RootStackParamList} from '../types';
import Route from '../enum/route';
import {
  fetchAllContries,
  fetchCountryData,
  TotalType,
} from '../services/CovidData';
import {switchDataLabels} from '../constants/data-labels';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, Route.Home>;
  route: RouteProp<RootStackParamList, Route.Home>;
};

const App: FC<Props> = ({navigation}) => {
  const [countries, setCountries] = useState<Country[]>();
  const [current, setCurrent] = useState<string>();

  const [chartType, setChartType] = useState<ChartType>(ChartType.Total);
  const [chartProps, setChartProps] = useState<ChartProps>();

  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState<number>();

  const updateTitle = useCallback((props: ChartProps) => {
    const size = props.labels.length;
    const activeTotal = props.active[size - 1];
    const deathsTotal = props.deaths[size - 1];
    const recoveredTotal = props.recovered[size - 1];
    switch (props.chartType) {
      case ChartType.Total:
        setTitle(activeTotal + deathsTotal + recoveredTotal);
        break;
      case ChartType.Active:
        setTitle(activeTotal);
        break;
      case ChartType.Deaths:
        setTitle(deathsTotal);
        break;
      default:
        setTitle(recoveredTotal);
        break;
    }
  }, []);

  const updateChartType = useCallback(
    (type: ChartType) => {
      setChartType(type);
      const props = {...chartProps!, chartType: type};
      setChartProps(props);
      updateTitle(props);
    },
    [chartProps, updateTitle],
  );

  const onOnPressDetails = useCallback(() => {
    if (chartProps) {
      navigation.navigate(Route.Details, {
        ...chartProps,
      });
    }
  }, [chartProps, navigation]);

  const goToErrorScreen = useCallback(
    (msg) => {
      navigation.navigate(Route.Error, {message: msg});
    },
    [navigation],
  );

  const getDataForCountry = useCallback(
    (countrySlug: string) => {
      const getData = async () => {
        try {
          const confirmed = await fetchCountryData(
            countrySlug,
            TotalType.Confirmed,
          );
          const recovered = await fetchCountryData(
            countrySlug,
            TotalType.Recovered,
          );
          const deaths = await fetchCountryData(countrySlug, TotalType.Deaths);
          const active = confirmed.cases.map(
            (conf, idx) => conf - recovered.cases[idx] - deaths.cases[idx],
          );
          setChartType(ChartType.Total);
          const props = {
            recovered: recovered.cases,
            deaths: deaths.cases,
            active,
            chartType: ChartType.Total,
            labels: confirmed.labels,
          };
          setChartProps(props);
          updateTitle(props);
        } catch (e) {
          goToErrorScreen(e.message);
        } finally {
          setIsLoading(false);
        }
      };
      setIsLoading(true);
      setCurrent(countrySlug);
      getData();
    },
    [goToErrorScreen, updateTitle],
  );

  console.log('title =', title);

  useEffect(() => {
    (async () => {
      try {
        if (!countries) {
          console.log('USE EFFECT FETCH');
          const countriesList = await fetchAllContries();
          setCountries(countriesList);
        }
        if (!current) {
          getDataForCountry('russia');
        }
      } catch (e) {
        goToErrorScreen(e.message);
      }
    })();
  }, [goToErrorScreen, getDataForCountry, countries, current, updateTitle]);

  if (isLoading) {
    return (
      <View style={[styles.centered, styles.container]}>
        <ActivityIndicator size="large" color="white" />
        <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>
          Fetching Data
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {countries && (
          <DropDown
            setCountry={getDataForCountry}
            countries={countries}
            current={current}
          />
        )}
        {title && (
          <View>
            <Text
              style={{
                color: switchDataLabels[chartType].color,
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 20,
                marginBottom: 20,
              }}>
              {`${switchDataLabels[chartType].text}:  ${title}`}
            </Text>
          </View>
        )}
        {chartProps && <Chart {...chartProps} />}
        <View style={styles.buttons}>
          <SwitchItem
            chartType={ChartType.Total}
            isActive={chartType === ChartType.Total}
            onPress={() => updateChartType(ChartType.Total)}
          />
          <SwitchItem
            chartType={ChartType.Recovered}
            isActive={chartType === ChartType.Recovered}
            onPress={() => updateChartType(ChartType.Recovered)}
          />
          <SwitchItem
            chartType={ChartType.Deaths}
            isActive={chartType === ChartType.Deaths}
            onPress={() => updateChartType(ChartType.Deaths)}
          />
          <SwitchItem
            chartType={ChartType.Active}
            isActive={chartType === ChartType.Active}
            onPress={() => updateChartType(ChartType.Active)}
          />
        </View>
        <Button title="More info" onPress={onOnPressDetails} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default App;
