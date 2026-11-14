// The Shorthand page's sample data: numbers, a time series, a matrix and a gene
/** Daily opening price of Apple stock, from January 2018 (the page's `numbers`). */
export const numbers = [
  170.16, 172.53, 172.54, 173.44, 174.35, 174.55, 173.16, 174.59, 176.18, 177.9, 176.15, 179.37, 178.61, 177.3, 177.3,
  177.25, 174.51, 172.0, 170.16, 165.53, 166.87, 167.17, 166.0, 159.1, 154.83, 163.09, 160.29, 157.07, 158.5, 161.95,
  163.04, 169.79, 172.36, 172.05, 172.83, 171.8, 173.67, 176.35, 179.1, 179.26,
];

// The trading days those prices belong to (the page's `timeSeries`, to two decimals).
const days = (
  '2018-01-02 2018-01-03 2018-01-04 2018-01-05 2018-01-08 2018-01-09 2018-01-10 2018-01-11 2018-01-12 2018-01-16 ' +
  '2018-01-17 2018-01-18 2018-01-19 2018-01-22 2018-01-23 2018-01-24 2018-01-25 2018-01-26 2018-01-29 2018-01-30 ' +
  '2018-01-31 2018-02-01 2018-02-02 2018-02-05 2018-02-06 2018-02-07 2018-02-08 2018-02-09 2018-02-12 2018-02-13 ' +
  '2018-02-14 2018-02-15 2018-02-16 2018-02-20 2018-02-21 2018-02-22 2018-02-23 2018-02-26 2018-02-27 2018-02-28'
).split(' ');

export const timeSeries: [Date, number][] = days.map((d, i) => [new Date(d), numbers[i]!]);

/** Who reviewed whose code. */
export const matrix = [
  ['Jacob', 'Olivia'], ['Mia', 'Noah'], ['Noah', 'Ava'], ['Ava', 'Mason'], ['Olivia', 'Noah'], ['Jacob', 'Emma'],
  ['Ava', 'Noah'], ['Noah', 'Jacob'], ['Olivia', 'Ava'], ['Mason', 'Emma'], ['Jacob', 'Mia'], ['Mia', 'Jacob'], ['Emma', 'Jacob'],
];

export const gene = 'AAAAGAGTGAAGATGCTGGAGACGAGTGAAGCATTCACTTTAGGGAAAGCGAGGCAAGAGCGTTTCAGAAGACGAAACCTGGTAGGTGCACTCACCACAG';
