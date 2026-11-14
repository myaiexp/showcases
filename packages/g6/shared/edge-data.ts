// Small node and edge layouts shared by the Edge and Combo examples
import type { GraphData } from '@antv/g6';

/** `n` node pairs stacked in rows: a{i} left, b{i} right, one edge e{i} each. */
export function rows(n: number, opts: { left?: number; right?: number; gap?: number; top?: number } = {}): GraphData {
  const { left = 40, right = 220, gap = 56, top = 30 } = opts;
  const nodes: NonNullable<GraphData['nodes']> = [];
  const edges: NonNullable<GraphData['edges']> = [];
  for (let i = 0; i < n; i++) {
    nodes.push({ id: `a${i}`, style: { x: left, y: top + i * gap } }, { id: `b${i}`, style: { x: right, y: top + i * gap } });
    edges.push({ id: `e${i}`, source: `a${i}`, target: `b${i}` });
  }
  return { nodes, edges };
}

/** One diagonal pair, for curves and rotated labels. */
export function diagonal(): GraphData {
  return {
    nodes: [
      { id: 'a', style: { x: 40, y: 150 } },
      { id: 'b', style: { x: 230, y: 40 } },
    ],
    edges: [{ id: 'e', source: 'a', target: 'b' }],
  };
}
