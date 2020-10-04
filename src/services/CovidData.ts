import formatDate from '../helpers/format-date';
import {Country, CountryTotal} from '../types';

export enum TotalType {
  Confirmed = 'confirmed',
  Deaths = 'deaths',
  Recovered = 'recovered',
}

export const fetchAllContries = async () => {
  const resp = await fetch('https://api.covid19api.com/countries');
  const contries: Country[] = await resp.json();
  return contries;
};

export const fetchCountryData = async (current: string, total: TotalType) => {
  const url = `https://api.covid19api.com/total/country/${current}/status/${total}?from=2019-12-30T14:00:00.000Z&to=${new Date().toISOString()}`;
  const resp = await fetch(url);
  const totals: CountryTotal[] = await resp.json();
  if (totals.length === 0) {
    return Promise.reject(new Error('Sorry! No data for this country!'));
  }
  const cases = totals.map(({Cases}) => Cases);
  const labels = totals.map(({Date: date}) => formatDate(date));
  return {labels, cases};
};
