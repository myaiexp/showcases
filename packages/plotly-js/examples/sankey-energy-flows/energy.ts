// An energy-flow table (sources, carriers, uses, in TWh) written in code to stand in for the docs' sankey_energy.json
export interface Flow {
  from: string;
  to: string;
  value: number;
}

// The docs fetch sankey_energy.json from the plotly.js repo, which is not vendored. These
// flows follow the same shape: primary sources feed carriers, carriers feed end uses.
export const flows: Flow[] = [
  { from: 'Coal', to: 'Electricity', value: 62 },
  { from: 'Natural gas', to: 'Electricity', value: 148 },
  { from: 'Natural gas', to: 'Heat', value: 210 },
  { from: 'Natural gas', to: 'Industry', value: 96 },
  { from: 'Oil', to: 'Fuels', value: 340 },
  { from: 'Nuclear', to: 'Electricity', value: 88 },
  { from: 'Offshore wind', to: 'Electricity', value: 156 },
  { from: 'Solar', to: 'Electricity', value: 54 },
  { from: 'Biomass', to: 'Electricity', value: 40 },
  { from: 'Biomass', to: 'Heat', value: 46 },
  { from: 'Imports', to: 'Electricity', value: 36 },
  { from: 'Electricity', to: 'Homes', value: 150 },
  { from: 'Electricity', to: 'Commerce', value: 118 },
  { from: 'Electricity', to: 'Industry', value: 160 },
  { from: 'Electricity', to: 'Transport', value: 52 },
  { from: 'Electricity', to: 'Losses', value: 104 },
  { from: 'Heat', to: 'Homes', value: 188 },
  { from: 'Heat', to: 'Commerce', value: 68 },
  { from: 'Fuels', to: 'Transport', value: 270 },
  { from: 'Fuels', to: 'Industry', value: 70 },
  { from: 'Industry', to: 'Losses', value: 64 },
];

export const nodeColors: Record<string, string> = {
  Coal: '#6b7280', 'Natural gas': '#fb923c', Oil: '#a16207', Nuclear: '#a78bfa', 'Offshore wind': '#22d3ee',
  Solar: '#facc15', Biomass: '#84cc16', Imports: '#f472b6', Electricity: '#60a5fa', Heat: '#f87171', Fuels: '#d97706',
  Homes: '#34d399', Commerce: '#2dd4bf', Industry: '#94a3b8', Transport: '#c084fc', Losses: '#52525b',
};

/** The node list and link arrays a sankey trace wants, built from the flow table. */
export function sankeyArrays(): {
  label: string[];
  color: string[];
  source: number[];
  target: number[];
  value: number[];
  linkLabel: string[];
} {
  const label: string[] = [];
  const id = (name: string): number => {
    let at = label.indexOf(name);
    if (at < 0) at = label.push(name) - 1;
    return at;
  };
  const source = flows.map((f) => id(f.from));
  const target = flows.map((f) => id(f.to));
  return {
    label,
    color: label.map((l) => nodeColors[l] ?? '#888'),
    source,
    target,
    value: flows.map((f) => f.value),
    linkLabel: flows.map((f) => `${f.from} to ${f.to}`),
  };
}
