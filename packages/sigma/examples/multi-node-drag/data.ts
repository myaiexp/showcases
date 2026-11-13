// A square grid graph with unit spacing, one node per cell
import Graph from 'graphology';

export function buildGrid(side: number): Graph {
  const graph = new Graph();
  for (let row = 0; row < side; row++) {
    for (let col = 0; col < side; col++) {
      graph.addNode(`${col},${row}`, { label: `${col},${row}`, x: col, y: row, size: 0.28, color: '#6d5acf' });
    }
  }
  for (let row = 0; row < side; row++) {
    for (let col = 0; col < side; col++) {
      if (col + 1 < side) graph.addEdge(`${col},${row}`, `${col + 1},${row}`, { size: 0.05 });
      if (row + 1 < side) graph.addEdge(`${col},${row}`, `${col},${row + 1}`, { size: 0.05 });
    }
  }
  return graph;
}
