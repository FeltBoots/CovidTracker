import Route from './enum/route';
import Chart from './enum/chart';

export type Country = {
  Country: string;
  ISO2: string;
  Slug: string;
};

export type CountryTotal = {
  Cases: number;
  Date: string;
};

export type TotalDataByCountry = {
  recovered: ChartData;
  deaths: ChartData;
  active: ChartData;
  labels: ChartLegend;
};

export type ChartData = number[];

export type ChartLegend = string[];

export type ChartProps = {
  recovered: ChartData;
  deaths: ChartData;
  active: ChartData;
  labels: ChartLegend;
  chartType: Chart;
};

export type ErrorScreenProps = {
  message: string;
};

type DetailsProps = Omit<ChartProps, 'chartType'>;

export type RootStackParamList = {
  [Route.Home]: undefined;
  [Route.Details]: DetailsProps;
  [Route.Error]: ErrorScreenProps;
};
