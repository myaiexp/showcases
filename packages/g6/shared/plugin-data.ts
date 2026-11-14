// Small datasets from the Plugin docs' snippets, shared by plugin- examples
import type { GraphData } from '@antv/g6';

/** The 6-node hub graph every plugin page's "Online Experience" snippet uses. */
export function hubData(): GraphData {
  return {
    nodes: Array.from({ length: 6 }, (_, i) => ({ id: `node-${i}` })),
    edges: [
      ...[1, 2, 3, 4].map((i) => ({ source: 'node-0', target: `node-${i}` })),
      ...[1, 2, 3, 4, 5].map((i) => ({ id: `back-${i}`, source: `node-${i}`, target: 'node-0' })),
    ],
  };
}

/** Hull page: seven placed nodes in two clusters. */
export function hullData(): GraphData {
  const pos: [number, number, string][] = [
    [555, 151, 'a'],
    [532, 323, 'a'],
    [473, 227, 'a'],
    [349, 212, 'a'],
    [234, 201, 'b'],
    [338, 333, 'b'],
    [365, 91, 'b'],
  ];
  return {
    nodes: pos.map(([x, y, cluster], i) => ({ id: `node-${i}`, data: { cluster }, style: { x, y } })),
    edges: [
      [0, 2],
      [1, 2],
      [2, 3],
      [3, 4],
      [3, 5],
      [3, 6],
    ].map(([s, t]) => ({ source: `node-${s}`, target: `node-${t}` })),
  };
}

/** Legend page: two node types and one edge type, split by data.cluster. */
export function legendData(): GraphData {
  return {
    nodes: [
      { id: 'node-1', type: 'circle', data: { cluster: 'node-type1' } },
      { id: 'node-2', type: 'rect', data: { cluster: 'node-type2' } },
      { id: 'node-3', type: 'circle', data: { cluster: 'node-type1' } },
      { id: 'node-4', type: 'rect', data: { cluster: 'node-type3' } },
    ],
    edges: [
      { source: 'node-1', target: 'node-2', data: { cluster: 'edge-type1' } },
      { source: 'node-2', target: 'node-3', data: { cluster: 'edge-type2' } },
      { source: 'node-3', target: 'node-4', data: { cluster: 'edge-type1' } },
    ],
  };
}

const DAY = 24 * 3600 * 1000;
export const START = new Date('2023-08-01').getTime();

/** Timebar page: 25 nodes spread over five days, edges linking them. */
export function timeData(): GraphData {
  return {
    nodes: Array.from({ length: 25 }, (_, i) => ({
      id: `node-${i}`,
      data: { timestamp: START + (i % 5) * DAY, value: i % 10 },
    })),
    edges: Array.from({ length: 25 }, (_, i) => ({
      id: `edge-${i}`,
      source: `node-${i % 12}`,
      target: `node-${(i % 10) + 15}`,
      data: { timestamp: START + (i % 5) * DAY },
    })),
  };
}

/** Timebar `data`: one value per day, for chart mode. */
export const timebarSeries = (values = [10, 2, 3, 4, 15]): { time: number; value: number }[] =>
  values.map((value, i) => ({ time: START + i * DAY, value }));

/** Fisheye and lens pages: a grid of n nodes, each linked to its right and lower neighbour. */
export function gridData(n: number, cols: number): GraphData {
  return {
    nodes: Array.from({ length: n }, (_, i) => ({ id: `g${i}` })),
    edges: Array.from({ length: n }, (_, i) => i)
      .flatMap((i) => [
        (i + 1) % cols !== 0 && i + 1 < n ? { id: `h${i}`, source: `g${i}`, target: `g${i + 1}` } : null,
        i + cols < n ? { id: `v${i}`, source: `g${i}`, target: `g${i + cols}` } : null,
      ])
      .filter((e): e is { id: string; source: string; target: string } => e !== null),
  };
}
