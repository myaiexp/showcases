// Neighbourhood highlighting on hover done with nodeReducer and edgeReducer instead of style rules
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildGraph } from './data.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildGraph(preview ? 80 : 160, 5);

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    // The only thing the reducers need to know: which node is hovered.
    customGraphState: { hoveredNode: null as string | null },
    nodeReducer: (key, computed, _attrs, _state, graphState, g) => {
      const { hoveredNode } = graphState;
      if (hoveredNode && key !== hoveredNode && !g.neighbors(hoveredNode).includes(key)) {
        return { ...computed, label: '', color: '#eceef1' };
      }
      return computed;
    },
    edgeReducer: (key, computed, _attrs, _state, graphState, g) => {
      const { hoveredNode } = graphState;
      if (hoveredNode) {
        const [source, target] = g.extremities(key);
        if (source !== hoveredNode && target !== hoveredNode) return { ...computed, visibility: 'hidden' };
      }
      return computed;
    },
  });

  let timer = 0;
  if (preview) {
    // No pointer: hop the hovered node around, as enterNode and leaveNode would.
    const nodes = graph.nodes();
    let i = 0;
    const hop = (): void => {
      const odd = i++ % 2 === 1;
      renderer.setGraphState({ hoveredNode: odd ? null : (nodes[(i * 13) % nodes.length] ?? null) });
    };
    hop();
    timer = window.setInterval(hop, 1100);
  } else {
    renderer.on('enterNode', ({ node }) => renderer.setGraphState({ hoveredNode: node }));
    renderer.on('leaveNode', () => renderer.setGraphState({ hoveredNode: null }));

    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.textContent = 'Hover a node: reducers grey out and hide everything outside its neighbourhood.';
    el.append(controls);
  }

  return () => {
    window.clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
