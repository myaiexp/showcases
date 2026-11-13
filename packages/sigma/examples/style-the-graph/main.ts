// Stores raw data on nodes and maps it to colour and size with sigma's declarative styles
import Graph from 'graphology';
import Sigma, { DEFAULT_STYLES } from 'sigma';
import type { Mount } from '@/types.ts';
import { makeDataset } from './data.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const dataset = makeDataset(preview ? 300 : 2000);

  // The graph only holds data: no color, no size.
  const graph = new Graph();
  for (const node of dataset.nodes) {
    graph.addNode(node.key, {
      label: node.label,
      x: node.x,
      y: node.y,
      cluster: node.cluster,
      score: node.score,
    });
  }
  for (const [source, target] of dataset.edges) graph.addEdge(source, target);

  // Sigma can't guess the dictionary or the input range, so extract them from the data.
  const clusterColors = Object.fromEntries(dataset.clusters.map((c) => [c.key, c.color]));
  const { minScore, maxScore } = dataset.nodes.reduce(
    ({ minScore, maxScore }, { score }) => ({
      minScore: Math.min(minScore, score),
      maxScore: Math.max(maxScore, score),
    }),
    { minScore: Infinity, maxScore: -Infinity },
  );

  const renderer = new Sigma(graph, container, {
    styles: {
      nodes: [
        // Keep the built-in hover behaviours (label visibility, depth layers, backdrops)...
        DEFAULT_STYLES.nodes,
        // ...and override colour (categorical binding) and size (numerical binding).
        {
          color: { attribute: 'cluster', dict: clusterColors, defaultValue: '#999' },
          size: { attribute: 'score', min: 10, max: 50, minValue: minScore, maxValue: maxScore },
          label: { attribute: 'label' },
        },
      ],
      edges: [DEFAULT_STYLES.edges, { color: '#ccc', size: 5 }],
    },
  });

  // Cards have no pointer: drift the camera so the gallery shows something moving.
  let timer = 0;
  if (preview) {
    let zoomed = false;
    const drift = (): void => {
      zoomed = !zoomed;
      renderer.getCamera().animate(
        zoomed ? { x: 0.35, y: 0.6, ratio: 0.5 } : { x: 0.5, y: 0.5, ratio: 1 },
        { duration: 2800 },
      );
    };
    drift();
    timer = window.setInterval(drift, 3200);
  }

  return () => {
    clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
