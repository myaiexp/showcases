// Sorting nodes with zIndex bound to a numeric attribute (degree)
import Sigma from 'sigma';
import { DEFAULT_STYLES } from 'sigma';
import type { Mount } from '@/types.ts';
import { buildBlob } from './data.ts';
import { addSelect, controlRow } from './ui.ts';
import './style.css';

const ORDERS = ['high degree on top', 'low degree on top', 'no ordering'] as const;

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildBlob();

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    styles: {
      nodes: [
        DEFAULT_STYLES.nodes,
        {
          // Any numeric attribute works directly as a zIndex: no range to bind.
          zIndex: { attribute: 'order' },
        },
      ],
    },
  });

  const setOrder = (choice: string): void => {
    // Changing zIndex re-sorts and reprocesses the graph, fine for a click or a slow timer.
    graph.updateEachNodeAttributes((_node, attrs) => {
      const degree = Number(attrs['degree']);
      const order = choice === ORDERS[0] ? degree : choice === ORDERS[1] ? -degree : 0;
      return { ...attrs, order };
    });
  };
  setOrder(ORDERS[0]);

  let timer = 0;
  if (preview) {
    let i = 0;
    timer = window.setInterval(() => setOrder(ORDERS[++i % ORDERS.length] ?? ORDERS[0]), 1800);
  } else {
    addSelect(controlRow(el), 'zIndex', ORDERS, ORDERS[0], setOrder);
  }

  return () => {
    clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
