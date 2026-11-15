// Made-up data sets for the style examples: big numbers, decimals, long legend names
import type { Data } from 'vizzu';

/** Five countries and their population, in the hundreds of millions, for number formats. */
export const bigData: Data.TableBySeries = {
  series: [
    { name: 'Country', type: 'dimension', values: ['China', 'India', 'USA', 'Indonesia', 'Brazil'] },
    { name: 'Population', type: 'measure', values: [1412600000, 1408000000, 331900000, 273800000, 214300000] },
  ],
};

/** Five mathematical constants with long fractions, for maxFractionDigits. */
export const fractionData: Data.TableBySeries = {
  series: [
    { name: 'Constant', type: 'dimension', values: ['Pi', 'e', 'Phi', 'Root 2', 'Gamma'] },
    { name: 'Value', type: 'measure', values: [3.14159265, 2.71828183, 1.61803399, 1.41421356, 0.57721566] },
  ],
};

/** The music data with long kind names, so the legend has wide labels. */
export const longKindsData: Data.TableBySeries = {
  series: [
    {
      name: 'Genres',
      type: 'dimension',
      values: ['Pop', 'Rock', 'Jazz', 'Metal', 'Pop', 'Rock', 'Jazz', 'Metal', 'Pop', 'Rock', 'Jazz', 'Metal'],
    },
    {
      name: 'Kinds',
      type: 'dimension',
      values: [
        'Hard and heavy', 'Hard and heavy', 'Hard and heavy', 'Hard and heavy',
        'Smooth and mellow', 'Experimental fusion', 'Smooth and mellow', 'Smooth and mellow',
        'Experimental fusion', 'Experimental fusion', 'Experimental fusion', 'Experimental fusion',
      ],
    },
    { name: 'Popularity', type: 'measure', values: [114, 96, 78, 52, 56, 36, 174, 121, 127, 83, 94, 58] },
  ],
};
