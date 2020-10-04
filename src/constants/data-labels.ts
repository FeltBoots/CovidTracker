import {
  total,
  recovered as recoveredColor,
  deaths as deathsColor,
  active as activeColor,
} from '../constants/colors';
import ChartType from '../enum/chart';

export const switchDataLabels = {
  [ChartType.Active]: {
    text: 'Active',
    color: activeColor,
  },
  [ChartType.Deaths]: {
    text: 'Deaths',
    color: deathsColor,
  },
  [ChartType.Recovered]: {
    text: 'Recovered',
    color: recoveredColor,
  },
  [ChartType.Total]: {
    text: 'Total',
    color: total,
  },
};

export const detailsDataLabels = {
  ...switchDataLabels,
  date: {
    text: 'Date',
    color: 'white',
  },
};
