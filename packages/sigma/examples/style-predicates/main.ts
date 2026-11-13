// Style predicates: whenData, whenState (string and object forms) and a `when` function
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildGraph } from './data.ts';
import { controlsRow, readout } from './ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildGraph(preview ? 10 : 18);

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    styles: {
      nodes: [
        { x: { attribute: 'x' }, y: { attribute: 'y' }, color: '#8d99ae', size: 2.4, label: { attribute: 'label' } },
        // whenData: static, only re-evaluated when graph attributes change.
        { whenData: 'important', then: { color: '#c9a227', size: 3.6 } },
        // whenState, object form: every listed flag must match.
        { whenState: { isHighlighted: true, isHovered: false }, then: { color: '#e76f51', labelVisibility: 'visible' } },
        // whenState, string form: true while the flag is true.
        { whenState: 'isHovered', then: { color: '#e22653', size: 5, labelVisibility: 'visible' } },
        // when: a full function predicate, re-evaluated on every state change. It reads graph state.
        {
          when: (_attrs, state, graphState) => graphState.hasHovered && !state.isHovered && !state.isHighlighted,
          then: { opacity: 0.25 },
        },
      ],
      edges: { color: '#ccc', size: 0.3 },
    },
  });

  // Hovering marks the node isHovered and its neighbours isHighlighted, so all four predicates fire.
  const setHovered = (node: string | null): void => {
    graph.forEachNode((n) => {
      renderer.setNodeState(n, { isHovered: n === node, isHighlighted: node !== null && n !== node && graph.areNeighbors(n, node) });
    });
    renderer.setGraphState({ hasHovered: node !== null });
  };

  let timer = 0;
  if (preview) {
    // Nothing hovers a card, so drive the same state flags from a timer.
    const nodes = graph.nodes();
    let i = 0;
    timer = window.setInterval(() => {
      i = (i + 7) % nodes.length;
      setHovered(i % 4 === 0 ? null : (nodes[i] ?? null));
    }, 900);
  } else {
    renderer.on('enterNode', ({ node }) => setHovered(node));
    renderer.on('leaveNode', () => setHovered(null));
    const row = controlsRow(el);
    readout(row, 'Hover a node: it turns red, its neighbours turn orange, the rest fade. Gold nodes match whenData: important.');
  }

  return () => {
    window.clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
