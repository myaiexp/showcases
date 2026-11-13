// The docs' first graph: three nodes and three edges rendered with default styles
import Graph from 'graphology';
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  // Sigma needs a container with an explicit width and height.
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = new Graph();
  graph.addNode('1', { label: 'Node 1', x: 0, y: 0, size: 1, color: 'blue' });
  graph.addNode('2', { label: 'Node 2', x: 5, y: 10, size: 1, color: 'red' });
  graph.addNode('3', { label: 'Node 3', x: 10, y: 0, size: 1, color: 'green' });
  graph.addEdge('1', '2', { size: 1 });
  graph.addEdge('2', '3', { size: 1 });
  graph.addEdge('3', '1', { size: 1 });

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
  });

  // In a gallery card, spin the triangle: sigma re-renders on every graph attribute change.
  let frame = 0;
  if (preview) {
    const start = performance.now();
    const tick = (now: number): void => {
      const angle = (now - start) / 2000;
      graph.forEachNode((node, attrs) => {
        const base = Number(node) * ((2 * Math.PI) / 3);
        graph.mergeNodeAttributes(node, {
          x: 5 + 6 * Math.cos(base + angle),
          y: 5 + 6 * Math.sin(base + angle),
          size: attrs['size'],
        });
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }

  return () => {
    cancelAnimationFrame(frame);
    // kill() releases the WebGL context, listeners and DOM sigma created.
    renderer.kill();
  };
};

export default mount;
