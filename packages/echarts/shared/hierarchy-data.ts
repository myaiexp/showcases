// Sample hierarchies for the tree, treemap and sunburst examples: a small code base by size, plus a growth figure
export interface HNode {
  name: string;
  value?: number | number[];
  children?: HNode[];
}

const leaf = (name: string, value: number): HNode => ({ name, value });
const group = (name: string, ...children: HNode[]): HNode => ({ name, children });

/** A project tree: leaf value is the file size in KB; groups leave `value` unset so it is the sum of the children. */
export const project: HNode = group(
  'project',
  group('src',
    group('core', leaf('parser', 48), leaf('lexer', 30), leaf('ast', 36), leaf('emit', 22)),
    group('ui', leaf('button', 12), leaf('modal', 18), leaf('table', 44), leaf('chart', 60), leaf('form', 26)),
    group('net', leaf('http', 28), leaf('socket', 20), leaf('cache', 16)),
  ),
  group('docs',
    group('guide', leaf('intro', 8), leaf('setup', 10), leaf('faq', 6)),
    group('api', leaf('core', 14), leaf('ui', 20)),
  ),
  group('tests',
    group('unit', leaf('core', 24), leaf('ui', 30), leaf('net', 14)),
    group('e2e', leaf('login', 9), leaf('checkout', 15)),
  ),
  group('tools', leaf('build', 18), leaf('lint', 7), leaf('release', 11)),
);

/** Deterministic "growth since last release" in percent (-20..+40) for a node name. */
export function growthOf(name: string): number {
  let h = 7;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return (h % 61) - 20;
}

/** Copy of a tree where every node's value is [size, growth]: the first dimension is the area, the second can drive colour. */
export function withGrowth(node: HNode): HNode {
  if (!node.children) return { name: node.name, value: [node.value as number, growthOf(node.name)] };
  const children = node.children.map(withGrowth);
  const size = children.reduce((sum, c) => sum + (c.value as number[])[0]!, 0);
  const growth = Math.round(children.reduce((sum, c) => sum + (c.value as number[])[1]! * (c.value as number[])[0]!, 0) / size);
  return { name: node.name, value: [size, growth], children };
}

/** A small collaboration network for the graph examples: 16 people in three teams. */
export const TEAMS = ['Design', 'Backend', 'Data'] as const;
const PEOPLE = [
  ['Ada', 0], ['Bo', 0], ['Cy', 0], ['Di', 0], ['Eli', 0],
  ['Fay', 1], ['Gus', 1], ['Hal', 1], ['Ivy', 1], ['Jo', 1], ['Kit', 1],
  ['Lou', 2], ['Max', 2], ['Ned', 2], ['Oz', 2], ['Pia', 2],
] as const;
export const people = PEOPLE.map(([name, team]) => ({ name, team }));
export const collaborations: [string, string][] = [
  ['Ada', 'Bo'], ['Ada', 'Cy'], ['Bo', 'Di'], ['Cy', 'Eli'], ['Di', 'Eli'], ['Ada', 'Fay'],
  ['Fay', 'Gus'], ['Fay', 'Hal'], ['Gus', 'Ivy'], ['Hal', 'Jo'], ['Ivy', 'Kit'], ['Jo', 'Kit'], ['Gus', 'Jo'],
  ['Kit', 'Lou'], ['Lou', 'Max'], ['Lou', 'Ned'], ['Max', 'Oz'], ['Ned', 'Pia'], ['Oz', 'Pia'], ['Max', 'Pia'],
  ['Eli', 'Hal'], ['Bo', 'Lou'],
];

/** A household budget as a flow: income -> pots -> spending, with some branches ending early (so nodeAlign matters). */
export const flowNodes = [
  'Salary', 'Freelance', 'Savings pool', 'Spending pool', 'Rent', 'Food', 'Transport', 'Fun', 'Emergency fund', 'Pension', 'Groceries', 'Restaurants', 'Travel',
].map((name) => ({ name }));
export const flowLinks: { source: string; target: string; value: number }[] = [
  { source: 'Salary', target: 'Savings pool', value: 20 },
  { source: 'Salary', target: 'Spending pool', value: 60 },
  { source: 'Freelance', target: 'Spending pool', value: 15 },
  { source: 'Freelance', target: 'Savings pool', value: 5 },
  { source: 'Savings pool', target: 'Emergency fund', value: 10 },
  { source: 'Savings pool', target: 'Pension', value: 15 },
  { source: 'Spending pool', target: 'Rent', value: 30 },
  { source: 'Spending pool', target: 'Food', value: 20 },
  { source: 'Spending pool', target: 'Transport', value: 10 },
  { source: 'Spending pool', target: 'Fun', value: 15 },
  { source: 'Food', target: 'Groceries', value: 14 },
  { source: 'Food', target: 'Restaurants', value: 6 },
  { source: 'Fun', target: 'Travel', value: 8 },
];
