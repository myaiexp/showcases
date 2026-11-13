// Two ways to refuse a drag: getDraggedNodes returning [] or preventSigmaDefault on nodeDragStart
import Sigma, { DEFAULT_STYLES } from 'sigma';
import type { Mount } from '@/types.ts';
import { buildGraph } from './data.ts';
import './style.css';

type Mode = 'getDraggedNodes' | 'preventSigmaDefault';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildGraph(preview ? 50 : 100, 4);
  // Every third node is locked.
  graph.forEachNode((node, _attrs) => graph.setNodeAttribute(node, 'locked', Number(node.slice(1)) % 3 === 0));

  let mode: Mode = 'getDraggedNodes';

  const renderer = new Sigma(graph, container, {
    settings: {
      autoRescale: 'once',
      enableNodeDrag: true,
      // An empty list means "nothing moves": the drag is simply never started.
      getDraggedNodes: (node) => (mode === 'getDraggedNodes' && graph.getNodeAttribute(node, 'locked') ? [] : [node]),
    },
    styles: {
      nodes: [
        DEFAULT_STYLES.nodes,
        { color: { attribute: 'color' }, size: { attribute: 'size' } },
        { when: (attrs) => attrs['locked'] === true, then: { color: '#4b5563', labelVisibility: 'visible' } },
      ],
      edges: [DEFAULT_STYLES.edges, { color: { attribute: 'color' }, size: { attribute: 'size' } }],
    },
  });

  // The alternative: let sigma start the drag, then veto it from the event.
  renderer.on('nodeDragStart', ({ node, preventSigmaDefault }) => {
    if (mode === 'preventSigmaDefault' && graph.getNodeAttribute(node, 'locked')) preventSigmaDefault();
  });

  let timer = 0;
  if (!preview) {
    renderer.on('clickNode', ({ node }) => graph.updateNodeAttribute(node, 'locked', (v) => !v));

    const controls = document.createElement('div');
    controls.className = 'controls';
    const select = document.createElement('select');
    for (const m of ['getDraggedNodes', 'preventSigmaDefault'] as const) {
      const option = document.createElement('option');
      option.value = option.textContent = m;
      select.append(option);
    }
    select.addEventListener('change', () => (mode = select.value as Mode));
    const label = document.createElement('label');
    label.append('Cancel drag with: ', select);
    controls.append(label, 'Dark nodes are locked. Click a node to lock or unlock it.');
    el.append(controls);
  } else {
    // No pointer: shove a free node and a locked node in turn. Only the free one is allowed to go.
    const nodes = graph.nodes();
    const free = nodes.filter((n) => !graph.getNodeAttribute(n, 'locked'));
    const locked = nodes.filter((n) => graph.getNodeAttribute(n, 'locked'));
    const home = new Map(nodes.map((n) => [n, { x: Number(graph.getNodeAttribute(n, 'x')), y: Number(graph.getNodeAttribute(n, 'y')) }]));
    let step = 0;
    timer = window.setInterval(() => {
      step++;
      const out = step % 2 === 1;
      const pool = Math.floor(step / 2) % 2 === 0 ? free : locked;
      const node = pool[Math.floor(step / 4) % pool.length];
      const h = node ? home.get(node) : undefined;
      if (!node || !h) return;
      // A locked node just flashes: the drag is refused, so it never moves.
      if (pool === locked) return void renderer.setNodeState(node, { isHighlighted: out });
      graph.mergeNodeAttributes(node, out ? { x: h.x + 20, y: h.y + 12 } : { x: h.x, y: h.y });
    }, 800);
  }

  return () => {
    window.clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
