// Shows sigma's five edge paths side by side: line, curved, S-curve, step and curved step
import Graph from 'graphology';
import Sigma, { DEFAULT_STYLES } from 'sigma';
import { pathCurved, pathCurvedS, pathLine, pathStep, pathStepCurved } from 'sigma/rendering';
import type { Mount } from '@/types.ts';
import './style.css';

// Path names come from the factories: "straight", "curved", "curvedS", "step", "stepCurved".
const PATHS = [
  { name: 'straight', label: 'pathLine()' },
  { name: 'curved', label: 'pathCurved()' },
  { name: 'curvedS', label: 'pathCurvedS()' },
  { name: 'step', label: 'pathStep()' },
  { name: 'stepCurved', label: 'pathStepCurved()' },
];

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  // One source/target pair per path. The target sits lower right so every path has to bend.
  const graph = new Graph();
  PATHS.forEach(({ name, label }, row) => {
    const y = row * 20;
    graph.addNode(`${name}-a`, { label, x: 0, y, size: 2, color: '#277da1' });
    graph.addNode(`${name}-b`, { label: '', x: 60, y: y + 12, size: 2, color: '#e22653' });
    graph.addEdge(`${name}-a`, `${name}-b`, { size: 0.7, color: '#555', path: name });
  });

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    primitives: {
      edges: {
        // The first path is the default; edges pick theirs through the `path` style property.
        paths: [pathLine(), pathCurved(), pathCurvedS(), pathStep(), pathStepCurved()],
      },
    },
    styles: {
      nodes: [DEFAULT_STYLES.nodes, { labelVisibility: 'visible', labelPosition: 'above' }],
      edges: [DEFAULT_STYLES.edges, { path: { attribute: 'path' } }],
    },
  });

  // Flex the targets up and down in cards so each path visibly reshapes.
  let frame = 0;
  if (preview) {
    const start = performance.now();
    const tick = (now: number): void => {
      const t = (now - start) / 1500;
      PATHS.forEach(({ name }, row) => {
        graph.setNodeAttribute(`${name}-b`, 'y', row * 20 + 12 + Math.sin(t + row * 0.4) * 8);
      });
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
