// Enables edge hit detection, then reports hovered edges and toggles highlight on click
import Sigma, { DEFAULT_STYLES } from 'sigma';
import type { Mount } from '@/types.ts';
import { buildGraph } from './data.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildGraph(preview ? 60 : 110, 4);
  graph.forEachEdge((edge) => graph.setEdgeAttribute(edge, 'size', 0.8));

  const renderer = new Sigma(graph, container, {
    // Edge events are off by default: edge picking costs extra GPU work.
    settings: { autoRescaleContent: 'nodes', enableEdgeEvents: true },
    styles: {
      nodes: [DEFAULT_STYLES.nodes, { size: { attribute: 'size' }, color: { attribute: 'color' } }],
      edges: [
        DEFAULT_STYLES.edges,
        { size: { attribute: 'size' }, color: { attribute: 'color' } },
        { whenState: 'isHovered', then: { color: '#6d5acf', size: 1.6 } },
        { whenState: 'isHighlighted', then: { color: '#e4572e', size: 1.6 } },
      ],
    },
  });

  let readout: HTMLElement | null = null;
  if (!preview) {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const label = document.createElement('span');
    label.textContent = 'Edge under the pointer:';
    readout = document.createElement('span');
    readout.className = 'readout';
    readout.textContent = 'none (click an edge to toggle its highlight)';
    controls.append(label, readout);
    el.append(controls);

    renderer.on('enterEdge', ({ edge }) => {
      const [source, target] = graph.extremities(edge);
      if (readout) readout.textContent = `${source} - ${target}`;
    });
    renderer.on('leaveEdge', () => {
      if (readout) readout.textContent = 'none (click an edge to toggle its highlight)';
    });
    renderer.on('clickEdge', ({ edge }) => {
      renderer.setEdgeState(edge, { isHighlighted: !renderer.getEdgeState(edge).isHighlighted });
    });
  }

  // No pointer in a card: step the hover and highlight flags along the edges instead.
  let timer = 0;
  if (preview) {
    const edges = graph.edges();
    let step = 0;
    let hovered: string | null = null;
    timer = window.setInterval(() => {
      if (hovered) renderer.setEdgeState(hovered, { isHovered: false });
      step++;
      hovered = edges[(step * 7) % edges.length] ?? null;
      if (!hovered) return;
      renderer.setEdgeState(hovered, { isHovered: true });
      if (step % 3 === 0) renderer.setEdgeState(hovered, { isHighlighted: !renderer.getEdgeState(hovered).isHighlighted });
    }, 700);
  }

  return () => {
    window.clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
