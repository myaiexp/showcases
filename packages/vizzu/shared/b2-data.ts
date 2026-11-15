// Made-up data for presets that need two measures: sales by channel, countries
import type { Data } from 'vizzu';

/**
 * Sales and customer counts for four regions in three sales channels (12 records).
 * Dimensions: Region, Channel. Measures: Sales (k$), Customers (the width measure for mekko charts).
 */
export const marketData: Data.TableBySeries = {
  series: [
    {
      name: 'Region',
      type: 'dimension',
      values: ['North', 'North', 'North', 'South', 'South', 'South', 'East', 'East', 'East', 'West', 'West', 'West'],
    },
    {
      name: 'Channel',
      type: 'dimension',
      values: ['Online', 'Retail', 'Partner', 'Online', 'Retail', 'Partner', 'Online', 'Retail', 'Partner', 'Online', 'Retail', 'Partner'],
    },
    { name: 'Sales', type: 'measure', unit: 'k$', values: [90, 120, 40, 45, 60, 30, 110, 70, 55, 30, 50, 20] },
    { name: 'Customers', type: 'measure', values: [900, 800, 200, 450, 400, 150, 1100, 500, 350, 300, 350, 100] },
  ],
};

/**
 * Eight made-up countries with three measures (8 records).
 * Dimensions: Country, Continent. Measures: Income (k$ per person), Online (% of people online), Population (millions).
 */
export const countryData: Data.TableBySeries = {
  series: [
    { name: 'Country', type: 'dimension', values: ['Aria', 'Borin', 'Cato', 'Dova', 'Elmo', 'Fenn', 'Gali', 'Hume'] },
    {
      name: 'Continent',
      type: 'dimension',
      values: ['North', 'North', 'Coast', 'Coast', 'Island', 'Island', 'Plains', 'Plains'],
    },
    { name: 'Income', type: 'measure', unit: 'k$', values: [48, 36, 22, 15, 31, 9, 6, 19] },
    { name: 'Online', type: 'measure', unit: '%', values: [95, 88, 70, 55, 90, 30, 18, 62] },
    { name: 'Population', type: 'measure', unit: 'M', values: [12, 40, 85, 140, 6, 60, 110, 25] },
  ],
};
