// A small random graph with dark edges that run through the labels, so backgrounds matter
import Graph from 'graphology';

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildGraph(): Graph {
  const rand = mulberry32(7);
  const graph = new Graph();
  const words = ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel', 'india', 'juliet', 'kilo', 'lima', 'mike', 'november'];
  words.forEach((word) => {
    graph.addNode(word, { label: word, x: rand() * 60, y: rand() * 30, size: 0.6, color: '#277da1' });
  });
  for (let i = 0; i < 26; i++) {
    const a = words[Math.floor(rand() * words.length)];
    const b = words[Math.floor(rand() * words.length)];
    if (a && b && a !== b && !graph.hasEdge(a, b) && !graph.hasEdge(b, a)) {
      graph.addEdge(a, b, { size: 0.25, color: '#444' });
    }
  }
  return graph;
}
