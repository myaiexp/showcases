// Thick coloured edges in a small web: labels centred on them are hard to read without help
import Graph from 'graphology';

export function buildWeb(): Graph {
  const graph = new Graph();
  const pts: Array<[string, number, number]> = [
    ['A', 0, 0],
    ['B', 40, 0],
    ['C', 40, 24],
    ['D', 0, 24],
    ['E', 20, 12],
  ];
  for (const [id, x, y] of pts) graph.addNode(id, { label: id, x, y, size: 1.2, color: '#222' });
  const edges: Array<[string, string, string, string]> = [
    ['A', 'B', 'north road', '#e22653'],
    ['B', 'C', 'east river', '#277da1'],
    ['C', 'D', 'south rail', '#43aa8b'],
    ['D', 'A', 'west canal', '#f3722c'],
    ['A', 'E', 'to centre', '#7b2cbf'],
    ['C', 'E', 'back', '#277da1'],
  ];
  for (const [s, t, label, color] of edges) graph.addEdge(s, t, { label, color, size: 0.7 });
  return graph;
}
