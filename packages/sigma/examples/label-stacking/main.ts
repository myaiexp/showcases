// Labels above other nodes: labelDepth routes labels into a higher depth bucket
import Sigma from 'sigma';
import { DEFAULT_STYLES } from 'sigma';
import type { Mount } from '@/types.ts';
import { buildPile } from './data.ts';
import { addSelect, controlRow } from './ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildPile();

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    primitives: {
      // Declare a higher bucket the labels can live in.
      depthLayers: ['edges', 'nodes', 'topEdges', 'topNodes'],
    },
    styles: {
      nodes: [
        DEFAULT_STYLES.nodes,
        {
          label: { attribute: 'label' },
          labelPosition: 'over',
          labelVisibility: 'visible',
          labelColor: '#111',
          labelSize: 13,
          // Geometry stays in its own bucket; the label goes where labelDepth says.
          depth: { attribute: 'depth', defaultValue: 'nodes' },
          labelDepth: { attribute: 'labelDepth', defaultValue: 'nodes' },
        },
      ],
    },
  });

  // "own bucket" is the default (label follows its node); "topNodes" lifts every label.
  const setLabelDepth = (choice: string): void => {
    graph.updateEachNodeAttributes((_node, attrs) => ({
      ...attrs,
      labelDepth: choice === 'topNodes' ? 'topNodes' : attrs['depth'],
    }));
  };

  let timer = 0;
  if (preview) {
    let on = false;
    timer = window.setInterval(() => {
      on = !on;
      setLabelDepth(on ? 'topNodes' : 'own bucket');
    }, 1500);
  } else {
    const row = controlRow(el);
    addSelect(row, 'labelDepth', ['own bucket', 'topNodes'], 'own bucket', setLabelDepth);
  }

  return () => {
    clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
