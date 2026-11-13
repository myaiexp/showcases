// Builds a graphology graph from a clustered dataset and renders it with default styles
import Graph from 'graphology';
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { makeDataset } from './data.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  // The docs fetch wikipedia.json here; we synthesise the same shape instead.
  // Previews use a smaller dataset to stay light.
  const dataset = makeDataset(preview ? 300 : 2000);

  // 1. Translate raw fields (cluster, score) into the visual attributes the default styles read.
  const clusterColors = Object.fromEntries(dataset.clusters.map((c) => [c.key, c.color]));
  let minScore = Infinity;
  let maxScore = -Infinity;
  for (const { score } of dataset.nodes) {
    minScore = Math.min(minScore, score);
    maxScore = Math.max(maxScore, score);
  }

  const graph = new Graph();
  for (const node of dataset.nodes) {
    const t = (node.score - minScore) / (maxScore - minScore);
    graph.addNode(node.key, {
      label: node.label,
      x: node.x,
      y: node.y,
      color: clusterColors[node.cluster] ?? '#999',
      size: 10 + t * 40,
    });
  }
  for (const [source, target] of dataset.edges) graph.addEdge(source, target);

  // 2. Render. graphology owns the data, sigma renders it.
  const renderer = new Sigma(graph, container);

  // A slow camera drift keeps the gallery card moving.
  let timer = 0;
  if (preview) {
    let zoomed = false;
    const drift = (): void => {
      zoomed = !zoomed;
      renderer.getCamera().animate(
        zoomed ? { x: 0.65, y: 0.4, ratio: 0.5 } : { x: 0.5, y: 0.5, ratio: 1 },
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
