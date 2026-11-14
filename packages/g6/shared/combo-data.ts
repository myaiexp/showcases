// Small combo datasets shared by the Combo examples
import type { GraphData } from '@antv/g6';

/** Two nodes in combo1, combo1 inside combo2 next to a third node: the docs' two-level graph. */
export function nested(): GraphData {
  return {
    nodes: [
      { id: 'node1', combo: 'combo1', style: { x: 90, y: 50 } },
      { id: 'node2', combo: 'combo1', style: { x: 170, y: 50 } },
      { id: 'node3', combo: 'combo2', style: { x: 130, y: 140 } },
    ],
    combos: [{ id: 'combo1', combo: 'combo2' }, { id: 'combo2' }],
  };
}

/** One combo with two nodes, for single-combo styling. */
export function single(): GraphData {
  return {
    nodes: [
      { id: 'node1', combo: 'combo1', style: { x: 110, y: 90 } },
      { id: 'node2', combo: 'combo1', style: { x: 170, y: 110 } },
    ],
    combos: [{ id: 'combo1' }],
  };
}
