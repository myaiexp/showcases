// Seeded tree data shared by the Hierarchy examples (treemap, sunburst, circle packing)
import type { ISpec } from './chart.ts';
import { rng } from './components-data.ts';

export interface TreeNode {
  name: string;
  value?: number;
  children?: TreeNode[];
}

/** A small software-module tree: three levels, 36 leaves, values from a seeded generator. */
export function moduleTree(seed = 5): TreeNode[] {
  const r = rng(seed);
  const leaves = (names: string[], base: number): TreeNode[] =>
    names.map((name) => ({ name, value: Math.round(base * (0.3 + r() * 1.4)) }));
  return [
    {
      name: 'query',
      children: [
        { name: 'methods', children: leaves(['add', 'and', 'avg', 'count', 'div', 'eq', 'gt', 'max'], 300) },
        ...leaves(['Expression', 'Comparison', 'Arithmetic', 'Query', 'Fn'], 3000),
      ],
    },
    {
      name: 'util',
      children: [
        { name: 'palette', children: leaves(['Color', 'Shape', 'Value'], 2200) },
        { name: 'math', children: leaves(['Dense', 'Sparse', 'Identity'], 2800) },
        ...leaves(['Arrays', 'Colors', 'Dates', 'Maths', 'Strings'], 7000),
      ],
    },
    {
      name: 'animate',
      children: [
        { name: 'interpolate', children: leaves(['Array', 'Color', 'Date', 'Number', 'Point'], 1800) },
        ...leaves(['Easing', 'Scheduler', 'Transition', 'Tween'], 6000),
      ],
    },
  ];
}

/** A fresh seed gives the same tree shape with new weights: feed it to updateData. */
export const reseed = (seed: number): TreeNode[] => moduleTree(seed);

/** Country > region > product sales: three levels with six leaves per country. */
export function salesTree(seed = 9): TreeNode[] {
  const r = rng(seed);
  const products = ['Office', 'Furniture', 'Electronics'];
  const region = (name: string): TreeNode => ({
    name,
    children: products.map((p) => ({ name: `${name} ${p}`, value: Math.round(200 + r() * 1400) })),
  });
  return [
    { name: 'Country A', children: ['A1', 'A2', 'A3', 'A4'].map(region) },
    { name: 'Country B', children: ['B1', 'B2', 'B3'].map(region) },
    { name: 'Country C', children: ['C1', 'C2'].map(region) },
  ];
}

/** Circle packing wants one root so the outermost circle exists. */
export function salesRoot(seed = 9): TreeNode[] {
  return [{ name: 'All sales', children: salesTree(seed) }];
}

/** Tooltip title helper: the path from the root to the hovered node, as the Treemap guide shows. */
export const pathTitle = {
  mark: {
    title: {
      value: (data: { datum?: { name: string }[] } | undefined): string => data?.datum?.map((d) => d.name).join(' / ') ?? '',
    },
  },
};

/** The treemap spec every treemap example starts from; examples spread their own options over it. */
export function treemapBase(preview: boolean): Record<string, unknown> {
  return {
    type: 'treemap',
    data: [{ id: 'data', values: moduleTree() }],
    categoryField: 'name',
    valueField: 'value',
    label: { visible: true, style: { fontSize: preview ? 9 : 11 } },
    tooltip: pathTitle,
  };
}

/** Cast a plain spec object to ISpec (hierarchy specs use nested data the ISpec types don't model). */
export const asSpec = (spec: object): ISpec => spec as ISpec;

/** The sunburst spec the sunburst examples start from: translucent leaves, opaque parents. */
export function sunburstBase(preview: boolean): Record<string, unknown> {
  return {
    type: 'sunburst',
    data: [{ id: 'data', values: salesTree() }],
    categoryField: 'name',
    valueField: 'value',
    outerRadius: 0.95,
    sunburst: { style: { fillOpacity: (d: { isLeaf?: boolean }) => (d.isLeaf ? 0.45 : 0.85) } },
    // Cards are too small for arc labels.
    label: { visible: !preview, style: { fontSize: 11 } },
    tooltip: pathTitle,
  };
}

/** The circle-packing spec: one root circle holding every country. */
export function packingBase(preview: boolean): Record<string, unknown> {
  return {
    type: 'circlePacking',
    data: [{ id: 'data', values: salesRoot() }],
    categoryField: 'name',
    valueField: 'value',
    circlePacking: { style: { fillOpacity: (d: { isLeaf?: boolean }) => (d.isLeaf ? 0.75 : 0.25) } },
    // Labels only on the country and region circles; the leaves are too small for text.
    label: { visible: !preview, style: { fontSize: 11, fill: '#fff', visible: (d: { depth: number }) => d.depth <= 2 } },
    tooltip: pathTitle,
  };
}
