// Seeded flow data shared by the Sankey examples: a household budget as nodes and links
import type { ISpec } from './chart.ts';
import { rng } from './components-data.ts';

export interface Link {
  source: string;
  target: string;
  value: number;
  color?: string;
}

export const BUDGET_NODES = ['Salary', 'Freelance', 'Dividends', 'Income', 'Housing', 'Food', 'Transport', 'Leisure', 'Savings', 'Rent', 'Utilities', 'Stocks', 'Cash'];

export const COLORS: Record<string, string> = {
  Salary: '#4f8cff',
  Freelance: '#36cfc9',
  Dividends: '#9254de',
  Income: '#73d13d',
  Housing: '#ffa940',
  Food: '#ff7a45',
  Transport: '#f759ab',
  Leisure: '#ffc53d',
  Savings: '#40a9ff',
  Rent: '#d3adf7',
  Utilities: '#ffd666',
  Stocks: '#95de64',
  Cash: '#5cdbd3',
};

/** The budget links; the seed changes the amounts, the topology stays. */
export function budgetLinks(seed = 4): Link[] {
  const r = rng(seed);
  const v = (base: number): number => Math.round(base * (0.7 + r() * 0.6));
  const links: [string, string, number][] = [
    ['Salary', 'Income', 3200],
    ['Freelance', 'Income', 900],
    ['Dividends', 'Income', 300],
    ['Income', 'Housing', 1500],
    ['Income', 'Food', 700],
    ['Income', 'Transport', 400],
    ['Income', 'Leisure', 500],
    ['Income', 'Savings', 1300],
    ['Housing', 'Rent', 1200],
    ['Housing', 'Utilities', 300],
    ['Savings', 'Stocks', 800],
    ['Savings', 'Cash', 500],
  ];
  return links.map(([source, target, base]) => ({ source, target, value: v(base), color: COLORS[source] ?? '#aaa' }));
}

/** Flat sankey data: one row holding the node list and the link list. */
export function budgetFlat(seed = 4, extraNodes: string[] = []): unknown[] {
  return [{ nodes: [...BUDGET_NODES, ...extraNodes].map((nodeName) => ({ nodeName })), links: budgetLinks(seed) }];
}

/** Nested sankey data: a tree whose levels become the columns. Names are unique, they key the nodes. */
export function budgetNested(seed = 4): unknown[] {
  const r = rng(seed);
  const v = (base: number): number => Math.round(base * (0.7 + r() * 0.6));
  const leaf = (name: string, base: number): { name: string; value: number } => ({ name, value: v(base) });
  return [
    {
      nodes: [
        { name: 'Income', value: 100, children: [
          { name: 'Needs', value: 50, children: [leaf('Rent', 30), leaf('Groceries', 12), leaf('Bills', 8)] },
          { name: 'Wants', value: 25, children: [leaf('Dining', 10), leaf('Travel', 9), leaf('Hobbies', 6)] },
          { name: 'Saving', value: 25, children: [leaf('Pension', 12), leaf('Index fund', 8), leaf('Emergency', 5)] },
        ] },
      ],
    },
  ];
}

/** Cast a plain spec object to ISpec. */
export const asSpec = (spec: object): ISpec => spec as ISpec;

/** Search phrases related to one keyword: `sim` is the relatedness (distance from the centre), `pv` the popularity. */
export function relatedWords(seed = 3): { word: string; pv: number; sim: number }[] {
  const r = rng(seed);
  const words = ['espresso machine', 'coffee grinder', 'french press', 'pour over', 'cold brew', 'moka pot', 'coffee beans', 'latte art', 'milk frother', 'drip coffee maker', 'decaf', 'arabica', 'robusta', 'coffee filter', 'cappuccino', 'aeropress', 'barista', 'roast levels', 'coffee scale', 'kettle', 'single origin', 'tamper', 'cortado', 'iced coffee', 'macchiato', 'descaler', 'burr grinder', 'coffee subscription', 'instant coffee', 'cezve'];
  return words.map((word, i) => ({
    word,
    pv: Math.round(500 + Math.pow(r(), 3) * 180000),
    sim: Math.round(4000 - i * 115 + r() * 90),
  }));
}

/** Region by segment sales for the mosaic examples. */
export function mosaicRows(seed = 2): { region: string; segment: string; sales: number }[] {
  const r = rng(seed);
  const regions = ['North', 'South', 'East', 'West'];
  const segments = ['Consumer', 'Corporate', 'Home office'];
  return regions.flatMap((region, i) => segments.map((segment) => ({ region, segment, sales: Math.round((120 + i * 70) * (0.5 + r())) })));
}
