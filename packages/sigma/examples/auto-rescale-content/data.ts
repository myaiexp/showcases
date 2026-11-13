// Large nodes and long labels sit on the extremes of the layout, where clipping shows up first
import Graph from 'graphology';

export function buildExtremes(): Graph {
  const graph = new Graph();
  const nodes: Array<[string, number, number, number]> = [
    ['Northwest Territories', 0, 0, 3],
    ['Northeast Passage Station', 40, 0, 2.5],
    ['Southwest Outpost Settlement', 0, 24, 2.5],
    ['Southeast Harbour Authority', 40, 24, 3],
    ['Centre', 20, 12, 1.2],
    ['Midwest Depot', 6, 12, 1],
    ['Eastern Relay', 34, 12, 1],
  ];
  for (const [label, x, y, size] of nodes) {
    graph.addNode(label, { label, x, y, size, color: size > 2 ? '#e22653' : '#277da1' });
  }
  const link = (a: string, b: string): void => void graph.addEdge(a, b, { size: 0.3, color: '#bbb' });
  link('Northwest Territories', 'Centre');
  link('Northeast Passage Station', 'Centre');
  link('Southwest Outpost Settlement', 'Centre');
  link('Southeast Harbour Authority', 'Centre');
  link('Midwest Depot', 'Centre');
  link('Eastern Relay', 'Centre');
  return graph;
}
