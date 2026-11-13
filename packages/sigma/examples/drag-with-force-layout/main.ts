// A live force layout that treats the node under the pointer as fixed, read from sigma's isDragged state
import Sigma, { DEFAULT_STYLES } from 'sigma';
import ForceSupervisor from 'graphology-layout-force/worker';
import type { Mount } from '@/types.ts';
import { buildGraph } from './data.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildGraph(preview ? 50 : 90, 4);

  const renderer = new Sigma(graph, container, {
    settings: { autoRescale: 'once', enableNodeDrag: true },
    styles: {
      nodes: [
        DEFAULT_STYLES.nodes,
        { color: { attribute: 'color' }, size: { attribute: 'size' } },
        { whenState: 'isDragged', then: { depth: 'topNodes', labelVisibility: 'visible' } },
      ],
      edges: [DEFAULT_STYLES.edges, { color: { attribute: 'color' }, size: { attribute: 'size' } }],
    },
  });

  // sigma tracks isDragged, so the layout needs no event handlers to know which node to pin.
  const layout = new ForceSupervisor(graph, {
    isNodeFixed: (node) => renderer.getNodeState(node).isDragged,
  });
  layout.start();

  let frame = 0;
  if (!preview) {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const toggle = document.createElement('button');
    const sync = (): void => {
      toggle.textContent = layout.isRunning() ? 'Pause layout' : 'Resume layout';
    };
    toggle.addEventListener('click', () => {
      if (layout.isRunning()) layout.stop();
      else layout.start();
      sync();
    });
    // Releasing a node restarts the layout, which may have converged and stopped.
    renderer.on('nodeDragEnd', () => {
      if (!layout.isRunning()) layout.start();
      sync();
    });
    sync();
    controls.append(toggle, 'Drag a node: it stays pinned while the rest relaxes around it.');
    el.append(controls);
  } else {
    // No pointer: hold one node and sweep it across the graph so the layout visibly reacts.
    const nodes = graph.nodes();
    const start = performance.now();
    const held = nodes[3] ?? nodes[0];
    if (held) renderer.setNodeState(held, { isDragged: true });
    const base = held ? { x: Number(graph.getNodeAttribute(held, 'x')), y: Number(graph.getNodeAttribute(held, 'y')) } : { x: 0, y: 0 };
    const tick = (now: number): void => {
      const t = (now - start) / 1500;
      if (held) graph.mergeNodeAttributes(held, { x: base.x + Math.cos(t) * 40, y: base.y + Math.sin(t) * 40 });
      if (!layout.isRunning()) layout.start();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }

  return () => {
    cancelAnimationFrame(frame);
    // The supervisor owns a requestAnimationFrame loop and graph listeners.
    layout.kill();
    renderer.kill();
  };
};

export default mount;
