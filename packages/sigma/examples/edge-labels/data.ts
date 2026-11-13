// Eight nodes on a ring plus a few chords, every edge carrying a text label
import Graph from 'graphology';

export function buildRing(): Graph {
  const graph = new Graph();
  const n = 8;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    graph.addNode(`n${i}`, { label: `N${i}`, x: 25 * Math.cos(a), y: 25 * Math.sin(a), size: 1.2, color: '#277da1' });
  }
  const verbs = ['knows', 'cites', 'follows', 'mentions', 'links to', 'extends', 'reads', 'replies to'];
  for (let i = 0; i < n; i++) {
    graph.addEdge(`n${i}`, `n${(i + 1) % n}`, { label: verbs[i], size: 0.3, color: '#999', pos: 'over' });
  }
  graph.addEdge('n0', 'n4', { label: 'crosses the ring', size: 0.3, color: '#999', pos: 'over' });
  graph.addEdge('n2', 'n6', { label: 'diagonal', size: 0.3, color: '#999', pos: 'over' });
  return graph;
}
