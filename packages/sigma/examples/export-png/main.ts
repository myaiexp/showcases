// Export the graph as an image: downloadAsImage in the full view, a live export thumbnail in cards
import { downloadAsImage, drawOnCanvas } from '@sigma/export-image';
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildGraph, COMMUNITIES } from './data.ts';
import { button, controlsRow, readout } from './ui.ts';
import './style.css';

const COLORS = ['#2a9d8f', '#e76f51', '#277da1', '#c9a227'];

const mount: Mount = (el, { preview }) => {
  const layout = document.createElement('div');
  layout.className = 'layout';
  const container = document.createElement('div');
  container.className = 'stage';
  layout.append(container);
  el.append(layout);

  const graph = buildGraph(preview ? 10 : 20);
  graph.forEachNode((node, attrs) => {
    const index = COMMUNITIES.indexOf(attrs['community'] as (typeof COMMUNITIES)[number]);
    graph.mergeNodeAttributes(node, { color: COLORS[index] ?? '#666' });
  });

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    styles: {
      nodes: { x: { attribute: 'x' }, y: { attribute: 'y' }, size: 2.6, color: { attribute: 'color' }, label: { attribute: 'label' } },
      edges: { color: '#ccc', size: 0.3 },
    },
  });

  let dead = false;
  let timer = 0;
  let frame = 0;

  if (preview) {
    // The graph breathes, and every few seconds the export is rendered into a thumbnail beside it.
    const thumb = document.createElement('div');
    thumb.className = 'thumb';
    layout.append(thumb);
    const start = performance.now();
    const base = new Map<string, { x: number; y: number }>();
    graph.forEachNode((node, attrs) => base.set(node, { x: Number(attrs['x']), y: Number(attrs['y']) }));
    const tick = (now: number): void => {
      const t = (now - start) / 1500;
      base.forEach((p, node) => {
        graph.mergeNodeAttributes(node, { x: p.x + Math.sin(t + p.y * 0.1) * 3, y: p.y + Math.cos(t + p.x * 0.1) * 3 });
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const snap = async (): Promise<void> => {
      const canvas = await drawOnCanvas(renderer, { backgroundColor: '#ffffff', width: 160, height: 160 });
      if (dead) return;
      thumb.replaceChildren(canvas);
    };
    void snap().catch(() => undefined);
    timer = window.setInterval(() => void snap().catch(() => undefined), 2500);
  } else {
    const row = controlsRow(el);
    const status = readout(row);
    const fileName = 'my-graph';
    button(row, 'Download PNG', () => {
      downloadAsImage(renderer, { fileName, format: 'png', backgroundColor: '#ffffff' });
      status.textContent = `Saved ${fileName}.png at the current stage size.`;
    });
    button(row, 'Download JPEG', () => {
      // JPEG has no alpha channel, so a background color matters.
      downloadAsImage(renderer, { fileName, format: 'jpeg', backgroundColor: '#ffffff' });
      status.textContent = `Saved ${fileName}.jpeg.`;
    });
    button(row, 'Download transparent PNG', () => {
      downloadAsImage(renderer, { fileName: 'my-graph-transparent', format: 'png' });
      status.textContent = 'Saved my-graph-transparent.png (default backgroundColor is transparent).';
    });
    status.textContent = 'Pan or zoom first: the export uses the current camera.';
  }

  return () => {
    dead = true;
    window.clearInterval(timer);
    cancelAnimationFrame(frame);
    renderer.kill();
  };
};

export default mount;
