// A small energy-flow graph for the Sankey examples
export interface FlowNode {
  id: string;
  label: string;
}

export interface Flow {
  from: string;
  to: string;
  amount: number;
}

export const flowNodes: readonly FlowNode[] = [
  ['coal', 'Coal'],
  ['gas', 'Gas'],
  ['wind', 'Wind'],
  ['solar', 'Solar'],
  ['grid', 'Grid'],
  ['heat', 'Heat'],
  ['homes', 'Homes'],
  ['industry', 'Industry'],
  ['transport', 'Transport'],
  ['loss', 'Losses'],
].map(([id, label]) => ({ id: id!, label: label! }));

export const flows: readonly Flow[] = [
  { from: 'coal', to: 'grid', amount: 30 },
  { from: 'gas', to: 'grid', amount: 24 },
  { from: 'gas', to: 'heat', amount: 18 },
  { from: 'wind', to: 'grid', amount: 22 },
  { from: 'solar', to: 'grid', amount: 12 },
  { from: 'grid', to: 'homes', amount: 28 },
  { from: 'grid', to: 'industry', amount: 38 },
  { from: 'grid', to: 'transport', amount: 8 },
  { from: 'grid', to: 'loss', amount: 14 },
  { from: 'heat', to: 'homes', amount: 12 },
  { from: 'heat', to: 'industry', amount: 6 },
];

export const nodeLabel = new Map(flowNodes.map((n) => [n.id, n.label]));
