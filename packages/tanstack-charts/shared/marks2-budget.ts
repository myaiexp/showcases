// A household budget by category for the pie and donut examples
export interface Spend {
  name: string;
  amount: number;
}

export const budget: readonly Spend[] = [
  { name: 'Rent', amount: 1200 },
  { name: 'Food', amount: 620 },
  { name: 'Transport', amount: 280 },
  { name: 'Savings', amount: 450 },
  { name: 'Leisure', amount: 240 },
  { name: 'Other', amount: 160 },
];
