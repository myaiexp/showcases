// Small positioned graphs for the Behavior examples, so synthetic input can aim at nodes
import type { GraphData } from '@antv/g6';

/** cols x rows nodes on a lattice, each joined to its right and lower neighbour. */
export function lattice(cols: number, rows: number, gap = 70): Required<Pick<GraphData, 'nodes' | 'edges'>> {
  const nodes: Required<GraphData>['nodes'] = [];
  const edges: Required<GraphData>['edges'] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      nodes.push({ id: `n${r}${c}`, style: { x: c * gap, y: r * gap } });
      if (c > 0) edges.push({ source: `n${r}${c - 1}`, target: `n${r}${c}` });
      if (r > 0) edges.push({ source: `n${r - 1}${c}`, target: `n${r}${c}` });
    }
  }
  return { nodes, edges };
}

/** Canvas position of lattice node (r, c). */
export const cell = (r: number, c: number, gap = 70): [number, number] => [c * gap, r * gap];

/** A path of n nodes in a row, joined in order. */
export function chain(n: number, gap = 60): Required<Pick<GraphData, 'nodes' | 'edges'>> {
  const nodes = Array.from({ length: n }, (_, i) => ({ id: `c${i}`, style: { x: i * gap, y: 0 } }));
  const edges = nodes.slice(1).map((node, i) => ({ source: `c${i}`, target: node.id }));
  return { nodes, edges };
}
