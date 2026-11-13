// A 4x3 grid of nodes, each carrying the label position it starts with
import Graph from 'graphology';

export const POSITIONS = ['right', 'left', 'above', 'below', 'over'] as const;
export type LabelPosition = (typeof POSITIONS)[number];

export function buildGrid(): Graph {
  const graph = new Graph();
  const names = ['Ada', 'Boole', 'Curry', 'Dijkstra', 'Euler', 'Fermat', 'Gauss', 'Hopper', 'Iverson', 'Jacobi', 'Knuth', 'Lovelace'];
  names.forEach((name, i) => {
    graph.addNode(name, {
      label: name,
      x: (i % 4) * 8,
      y: Math.floor(i / 4) * 8,
      size: 0.5,
      color: '#e22653',
      // The per-node starting position: a cycle through all five values.
      pos: POSITIONS[i % POSITIONS.length],
      angle: 0,
    });
  });
  return graph;
}
