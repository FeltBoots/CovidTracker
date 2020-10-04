import React, {
  FC,
  useRef,
  useState,
  RefObject,
  useCallback,
  useEffect,
} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {debounce} from 'debounce';
import {
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {ChartProps} from '../types';
import ChartType from '../enum/chart';
import {recovered, deaths, active} from '../constants/colors';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth * 20;
const chartHeight = 400;

const chartConfig = {
  backgroundColor: 'black',
  backgroundGradientFrom: 'black',
  backgroundGradientTo: 'black',
  color: () => 'rgba(255, 255, 0, 0.3)',
  labelColor: () => 'white',
  fillShadowGradient: 'rgb(255, 255, 0)',
  fillShadowGradientOpacity: 0.3,
  propsForHorizontalLabels: {
    stroke: 'rgba(255, 255, 255, 0.1)',
  },
  propsForVerticalLabels: {
    stroke: 'rgba(255, 255, 255, 0.6)',
    dx: '10 0 -18',
    dy: '20 0 20',
    fontWeight: '100',
    fontSize: '12',
  },
};

const chartColors = [recovered, deaths, active];

const scrollToToday = (scrollViewRef?: RefObject<ScrollView>) => {
  scrollViewRef?.current?.scrollTo({
    x: chartWidth,
    animated: true,
  });
};

const chartDataConfig = (chartData: ChartProps) => {
  const {labels, chartType, ...restData} = chartData;
  if (chartType === ChartType.Total) {
    return {
      labels,
      datasets: Object.values(restData).map((data, idx) => ({
        data,
        color: () => chartColors[idx],
      })),
    };
  }
  return {
    labels,
    datasets: [
      {
        data: Object.values(restData)[chartType],
        color: () => chartColors[chartType],
      },
    ],
  };
};

const Chart: FC<ChartProps> = (props) => {
  let scrollViewRef = useRef() as RefObject<ScrollView>;

  const [yLabelsOffset, setYLabelsOffset] = useState(-chartWidth + screenWidth);

  useEffect(() => {
    scrollToToday(scrollViewRef);
  }, [scrollViewRef]);

  const updateLabelOffset = debounce((x: number) => {
    setYLabelsOffset(x);
  }, 180);

  const onMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const xPos = e.nativeEvent.contentOffset.x;
      updateLabelOffset(-xPos);
    },
    [updateLabelOffset],
  );

  return (
    <ScrollView
      horizontal={true}
      ref={scrollViewRef}
      onMomentumScrollEnd={onMomentumScrollEnd}
      style={{marginBottom: 40}}>
      <LineChart
        data={{
          ...chartDataConfig(props),
        }}
        width={chartWidth}
        height={chartHeight}
        chartConfig={chartConfig}
        yLabelsOffset={yLabelsOffset}
      />
    </ScrollView>
  );
};

export default Chart;
