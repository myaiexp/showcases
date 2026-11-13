// Rule-level match: matchData/cases picks a style block from the value of a graph attribute
import Sigma from 'sigma';
import { extremityArrow, sdfCircle, sdfSquare } from 'sigma/rendering';
import type { Mount } from '@/types.ts';
import { buildGraph } from './data.ts';
import { button, controlsRow } from './ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildGraph(preview ? 12 : 20);

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    primitives: {
      // Each node picks its shape by name, so every shape it may use is declared here.
      nodes: { shapes: [sdfCircle(), sdfSquare()] },
      edges: { extremities: [extremityArrow()] },
    },
    styles: {
      nodes: [
        // Base rule: always applied.
        { x: { attribute: 'x' }, y: { attribute: 'y' }, color: '#666', size: 2.6, label: { attribute: 'label' } },
        // Only reads graph attributes, so hovering never re-evaluates it.
        {
          matchData: 'type',
          cases: {
            person: { shape: 'circle', color: '#e22653' },
            company: { shape: 'square', color: '#277da1', size: 3.2 },
          },
        },
      ],
      edges: [
        { color: '#ccc', size: 0.3 },
        {
          matchData: 'type',
          cases: {
            citation: { color: '#2a9d8f', head: 'arrow' },
            coauthorship: { color: '#e76f51', size: 0.8 },
          },
        },
      ],
    },
  });

  // Flip the matched attribute: the same rule now yields the other case, no style change.
  const flipTypes = (): void => {
    graph.forEachNode((node, attrs) =>
      graph.setNodeAttribute(node, 'type', attrs['type'] === 'person' ? 'company' : 'person'),
    );
    graph.forEachEdge((edge, attrs) =>
      graph.setEdgeAttribute(edge, 'type', attrs['type'] === 'citation' ? 'coauthorship' : 'citation'),
    );
  };

  let timer = 0;
  if (preview) {
    timer = window.setInterval(flipTypes, 1400);
  } else {
    const row = controlsRow(el);
    button(row, 'Flip node and edge types', flipTypes);
  }

  return () => {
    window.clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
