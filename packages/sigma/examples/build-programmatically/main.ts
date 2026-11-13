// Start from the docs' alice/bob graph and grow it with addNode / addEdge / dropNode calls
import Graph from 'graphology';
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { mulberry32, pick, randomNodeAttributes } from './data.ts';
import { button, controlsRow } from './ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const rand = mulberry32(4);
  const graph = new Graph();

  // The docs' snippet, verbatim apart from the sizes being read as screen pixels below.
  const seed = (): void => {
    graph.clear();
    graph.addNode('alice', { label: 'Alice', x: 0, y: 0, size: 15, color: '#e22653' });
    graph.addNode('bob', { label: 'Bob', x: 100, y: 100, size: 10, color: '#277da1' });
    graph.addEdge('alice', 'bob');
  };
  seed();

  // Sizes in the docs (15, 10) are pixel-like, so ask sigma to read them as screen sizes.
  const renderer = new Sigma(graph, container, {
    settings: { itemSizesReference: 'screen', stagePadding: 40 },
  });

  let counter = 2;
  const addNode = (): void => {
    const key = `n${counter}`;
    graph.addNode(key, randomNodeAttributes(rand, counter));
    // Connect the newcomer to someone already there.
    graph.addEdge(key, pick(rand, graph.nodes().filter((n) => n !== key)));
    counter++;
    update();
  };
  const addEdge = (): void => {
    const nodes = graph.nodes();
    const a = pick(rand, nodes);
    const b = pick(rand, nodes);
    // Graphology refuses duplicate edges: mergeEdge adds the edge only if it is missing.
    if (a !== b) graph.mergeEdge(a, b);
    update();
  };
  const dropNode = (): void => {
    if (graph.order > 2) graph.dropNode(pick(rand, graph.nodes()));
    update();
  };
  const reset = (): void => {
    seed();
    counter = 2;
    update();
  };

  let readout: HTMLElement | null = null;
  const update = (): void => {
    if (readout) readout.textContent = `${graph.order} nodes, ${graph.size} edges`;
  };

  let timer = 0;
  if (preview) {
    // Grow the graph node by node, then start over from alice and bob.
    timer = window.setInterval(() => {
      if (graph.order >= 14) reset();
      else addNode();
    }, 650);
  } else {
    const row = controlsRow(el);
    readout = document.createElement('span');
    row.append(
      button('Add node', addNode),
      button('Add edge', addEdge),
      button('Drop node', dropNode),
      button('Reset', reset),
      readout,
    );
    update();
  }

  return () => {
    window.clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
