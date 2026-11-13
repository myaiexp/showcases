// HTML cluster labels positioned in graph space and re-synced on every afterRender
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { clusteredGraph } from './data.ts';
import { button, controlsRow } from './ui.ts';
import './style.css';

const NAMES = ['Sailors', 'Bakers', 'Pilots', 'Weavers', 'Potters', 'Smiths'];

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const { graph, communities } = clusteredGraph(preview ? 4 : 6, preview ? 20 : 35, 11);
  // The built-in node labels would compete with ours.
  const renderer = new Sigma(graph, container, { settings: { renderLabels: false } });

  // Overlay above sigma. pointer-events: none lets mouse and touch reach sigma's own layers.
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  container.append(overlay);

  // Centroid of each cluster: the mean of its nodes' x and y.
  const labels = communities.map((c) => {
    let sx = 0;
    let sy = 0;
    c.nodes.forEach((n) => {
      sx += Number(graph.getNodeAttribute(n, 'x'));
      sy += Number(graph.getNodeAttribute(n, 'y'));
    });
    const label = document.createElement('div');
    label.className = 'cluster-label';
    label.textContent = NAMES[c.id] ?? `Cluster ${c.id + 1}`;
    label.style.borderColor = c.color;
    overlay.append(label);
    return { el: label, x: sx / c.nodes.length, y: sy / c.nodes.length };
  });

  // Runs after every render, which covers camera pan, zoom, rotation and resize.
  const sync = (): void => {
    labels.forEach((l) => {
      const { x, y } = renderer.graphToViewport({ x: l.x, y: l.y });
      l.el.style.left = `${x}px`;
      l.el.style.top = `${y}px`;
    });
  };
  renderer.on('afterRender', sync);
  sync();

  const camera = renderer.getCamera();
  // Frame a cluster: camera.animate takes framed-graph coordinates.
  const focus = (index: number, ratio: number): Promise<void> => {
    const l = labels[index];
    if (!l) return Promise.resolve();
    const target = renderer.graphToFramedGraph({ x: l.x, y: l.y });
    return camera.animate({ x: target.x, y: target.y, ratio }, { duration: 900 });
  };

  let timer = 0;
  if (preview) {
    // Tour the clusters: the labels must stick to their groups throughout the move.
    let i = 0;
    const tour = (): void => {
      void focus(i % labels.length, 0.5);
      i++;
    };
    tour();
    timer = window.setInterval(tour, 1800);
  } else {
    const row = controlsRow(el);
    labels.forEach((l, i) => row.append(button(l.el.textContent ?? '', () => void focus(i, 0.4))));
    row.append(button('Reset', () => void camera.reset({ duration: 700 })));
  }

  return () => {
    window.clearInterval(timer);
    camera.cancelAnimation();
    renderer.kill();
  };
};

export default mount;
