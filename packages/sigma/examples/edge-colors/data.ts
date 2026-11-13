// A ring of coloured nodes with chords; each edge carries its own colour attributes
export interface RingEdge {
  source: string;
  target: string;
  color: string;
  tint: string;
}

const NODE_COLORS = ['#e22653', '#f9a03f', '#43aa8b', '#277da1', '#6c3e81'];
const EDGE_COLORS = ['#e63946', '#2a9d8f', '#e9c46a', '#264653'];

export const ringNodes = Array.from({ length: 16 }, (_, i) => {
  const angle = (i / 16) * Math.PI * 2;
  return {
    key: `n${i}`,
    x: Math.cos(angle) * 40,
    y: Math.sin(angle) * 40,
    color: NODE_COLORS[i % NODE_COLORS.length] ?? '#999',
  };
});

// Deterministic chords: every node links to the next one and to the one five steps on.
export const ringEdges: RingEdge[] = ringNodes.flatMap((node, i) =>
  [1, 5].map((step, k) => ({
    source: node.key,
    target: `n${(i + step) % 16}`,
    color: EDGE_COLORS[(i + k) % EDGE_COLORS.length] ?? '#999',
    tint: EDGE_COLORS[(i * 3 + k + 1) % EDGE_COLORS.length] ?? '#999',
  })),
);
