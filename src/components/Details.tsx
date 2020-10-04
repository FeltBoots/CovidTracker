import React, {FC} from 'react';
import {View, Button, Text, FlatList, Dimensions} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import {detailsDataLabels} from '../constants/data-labels';
import Route from '../enum/route';
import ChartType from '../enum/chart';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, Route.Details>;
  route: RouteProp<RootStackParamList, Route.Details>;
};

type DetailsItemProps = {
  color: string;
  text: string | number;
  isTitle: boolean;
};

const getDetailItem = ({color, text, isTitle}: DetailsItemProps) => (
  <View style={{flexBasis: itemWidth}}>
    <Text
      style={{
        color,
        fontSize: isTitle ? 18 : 16,
      }}>
      {text}
    </Text>
  </View>
);

const itemWidth = Dimensions.get('window').width / 4;

const Details: FC<Props> = ({
  navigation,
  route: {
    params: {recovered, deaths, active, labels},
  },
}) => {
  const data = labels.map((_, idx) => ({
    recovered: recovered[labels.length - idx - 1],
    deaths: deaths[labels.length - idx - 1],
    active: active[labels.length - idx - 1],
    date: labels[labels.length - idx - 1],
  }));

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <FlatList
        data={[
          {
            date: detailsDataLabels.date.text,
            recovered: detailsDataLabels[ChartType.Recovered].text,
            active: detailsDataLabels[ChartType.Active].text,
            deaths: detailsDataLabels[ChartType.Deaths].text,
            key: detailsDataLabels.date.text,
          },
          ...data,
        ]}
        renderItem={({item, index}) => (
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            {getDetailItem({
              color: detailsDataLabels.date.color,
              text: item.date,
              isTitle: index === 0,
            })}
            {getDetailItem({
              color: detailsDataLabels[ChartType.Recovered].color,
              text: item.recovered,
              isTitle: index === 0,
            })}
            {getDetailItem({
              color: detailsDataLabels[ChartType.Active].color,
              text: item.active,
              isTitle: index === 0,
            })}
            {getDetailItem({
              color: detailsDataLabels[ChartType.Deaths].color,
              text: item.deaths,
              isTitle: index === 0,
            })}
          </View>
        )}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Details;
