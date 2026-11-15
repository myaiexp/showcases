// Eight regional series with a quarterly value, for legend layout examples
export const regionNames = ['North America', 'Latin America', 'Western Europe', 'Eastern Europe', 'Middle East', 'Africa', 'South Asia', 'Pacific'] as const;
export const quarters = ['Q1', 'Q2', 'Q3', 'Q4'] as const;

export interface RegionRow {
  id: string;
  region: string;
  quarter: string;
  sales: number;
}

export const regionRows: readonly RegionRow[] = regionNames.flatMap((region, r) =>
  quarters.map((quarter, q) => ({ id: `${r}-${q}`, region, quarter, sales: Math.round(40 + r * 6 + q * (4 + (r % 3) * 3) + ((r * 17 + q * 11) % 13)) })),
);
