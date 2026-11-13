// A ring of named nodes joined to their neighbours, used to read label text clearly
import Graph from 'graphology';

export function buildRing(): Graph {
  const graph = new Graph();
  const names = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Ceres', 'Pluto'];
  names.forEach((name, i) => {
    const a = (i / names.length) * Math.PI * 2;
    graph.addNode(name, { label: name, x: 20 * Math.cos(a), y: 20 * Math.sin(a), size: 1, color: '#277da1' });
  });
  names.forEach((name, i) => graph.addEdge(name, names[(i + 1) % names.length] ?? name, { size: 0.15, color: '#ccc' }));
  return graph;
}
