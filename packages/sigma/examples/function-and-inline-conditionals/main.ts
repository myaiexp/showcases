// Function values and inline conditionals: three ways to vary one property without a separate rule
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildGraph } from './data.ts';
import { hueToHex } from './hue.ts';
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
      nodes: {
        x: { attribute: 'x' },
        y: { attribute: 'y' },
        // Function: full control. (attributes, state, graphState, graph) => value.
        color: (attributes, state) => {
          if (state.isHovered) return '#e22653';
          return hueToHex(Number(attributes['score']) * 2.4);
        },
        // Inline state conditional: one property, one predicate.
        size: { whenState: 'isHovered', then: 5, else: { attribute: 'degree', defaultValue: 2 } },
        // Inline data conditional: re-evaluated only when attributes change.
        labelVisibility: { whenData: 'important', then: 'visible', else: 'auto' },
        label: { attribute: 'label' },
        // Inline function conditional: `when` reads graph state, so it skips static analysis.
        opacity: { when: (_a, state, graphState) => graphState.hasHovered && !state.isHovered, then: 0.35, else: 1 },
      },
      edges: { color: '#ccc', size: 0.3 },
    },
  });

  // Scores drift, so the function-valued color has something to recompute.
  const driftTimer = window.setInterval(() => {
    graph.forEachNode((node, attrs) => {
      graph.setNodeAttribute(node, 'score', (Number(attrs['score']) + 3) % 100);
    });
  }, 120);

  let hoverTimer = 0;
  if (preview) {
    const nodes = graph.nodes();
    let i = 0;
    hoverTimer = window.setInterval(() => {
      i = (i + 5) % nodes.length;
      const picked = i % 3 === 0 ? null : (nodes[i] ?? null);
      nodes.forEach((n) => renderer.setNodeState(n, { isHovered: n === picked }));
      renderer.setGraphState({ hasHovered: picked !== null });
    }, 1000);
  } else {
    const row = controlsRow(el);
    readout(row, 'Hue is a function of score and drifts. Size follows degree, and grows on hover. Everything else fades while hovering. Important nodes always show their label.');
  }

  return () => {
    window.clearInterval(driftTimer);
    window.clearInterval(hoverTimer);
    renderer.kill();
  };
};

export default mount;
