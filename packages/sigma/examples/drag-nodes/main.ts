// Built-in node dragging: enableNodeDrag with a frozen coordinate system and a dragged-node style
import Sigma, { DEFAULT_STYLES } from 'sigma';
import type { Mount } from '@/types.ts';
import { buildGraph } from './data.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildGraph(preview ? 60 : 120, 4);

  const renderer = new Sigma(graph, container, {
    settings: {
      // "once" captures the initial extent, so the view doesn't rescale while nodes are dragged out of it.
      autoRescale: 'once',
      enableNodeDrag: true,
    },
    styles: {
      nodes: [
        DEFAULT_STYLES.nodes,
        { color: { attribute: 'color' }, size: { attribute: 'size' } },
        // isDragged is a built-in node state flag.
        { whenState: 'isDragged', then: { depth: 'topNodes', labelVisibility: 'visible', color: '#e4572e' } },
      ],
      edges: [DEFAULT_STYLES.edges, { color: { attribute: 'color' }, size: { attribute: 'size' } }],
    },
  });

  let frame = 0;
  if (!preview) {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const readout = document.createElement('span');
    readout.className = 'readout';
    readout.textContent = 'Drag any node.';
    controls.append(readout);
    el.append(controls);

    renderer.on('nodeDragStart', ({ node }) => (readout.textContent = `dragging ${node}`));
    renderer.on('nodeDrag', ({ node }) => {
      const { x, y } = graph.getNodeAttributes(node);
      readout.textContent = `dragging ${node} at (${Number(x).toFixed(1)}, ${Number(y).toFixed(1)})`;
    });
    renderer.on('nodeDragEnd', ({ node }) => (readout.textContent = `dropped ${node}`));
  } else {
    // No pointer: pick up a node, carry it along a loop, drop it, pick the next one.
    const nodes = graph.nodes();
    const start = performance.now();
    let current: string | null = null;
    let origin = { x: 0, y: 0 };
    const tick = (now: number): void => {
      const t = (now - start) / 1000;
      const slot = Math.floor(t / 2.4);
      const node = nodes[(slot * 11) % nodes.length] ?? null;
      if (node !== current) {
        if (current) renderer.setNodeState(current, { isDragged: false });
        current = node;
        if (!node) return;
        origin = { x: Number(graph.getNodeAttribute(node, 'x')), y: Number(graph.getNodeAttribute(node, 'y')) };
        renderer.setNodeState(node, { isDragged: true });
      }
      if (current) {
        const a = (t % 2.4) * 2.6;
        graph.mergeNodeAttributes(current, {
          x: origin.x + Math.cos(a) * 22 - 22,
          y: origin.y + Math.sin(a) * 22,
        });
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }

  return () => {
    cancelAnimationFrame(frame);
    renderer.kill();
  };
};

export default mount;
