// Small literal tables the Marks docs page defines inline
export const linedata = [
  { hour: 0, value: 8, sensor: 'A' },
  { hour: 0, value: 6, sensor: 'B' },
  { hour: 1, value: 7, sensor: 'A' },
  { hour: 1, value: 5, sensor: 'B' },
  { hour: 2, value: 3, sensor: 'A' },
  { hour: 2, value: 0, sensor: 'B' },
  { hour: 3, value: 9, sensor: 'A' },
  { hour: 3, value: 2, sensor: 'B' },
];

/** Population by year, with 2018 missing on purpose. */
export const timeseries = [
  { year: 2014, population: 7295.290765 },
  { year: 2015, population: 7379.797139 },
  { year: 2016, population: 7464.022049 },
  { year: 2017, population: 7547.858925 },
  { year: 2019, population: 7713.4681 },
  { year: 2020, population: 7794.798739 },
];

export const sales = [
  { units: 10, fruit: 'peach' },
  { units: 20, fruit: 'pear' },
  { units: 40, fruit: 'plum' },
  { units: 30, fruit: 'plum' },
];

/** The next item in a list after `cur`, wrapping around: for card `step`s. */
export const after = <T>(list: readonly T[], cur: T): T => list[(list.indexOf(cur) + 1) % list.length] as T;
