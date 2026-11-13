// Drawing on the exported canvas: a 2D watermark via drawOnCanvas, and withTempRenderer middleware
import { drawOnCanvas } from '@sigma/export-image';
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildGraph } from './data.ts';
import { button, controlsRow, readout } from './ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const layout = document.createElement('div');
  layout.className = 'layout';
  const container = document.createElement('div');
  container.className = 'stage';
  const result = document.createElement('div');
  result.className = 'result';
  const img = document.createElement('img');
  img.alt = 'The exported graph with custom drawing';
  img.hidden = true; // no broken-image icon while the first export is still being encoded
  const caption = document.createElement('div');
  caption.className = 'caption';
  result.append(img, caption);
  layout.append(container, result);
  el.append(layout);

  const graph = buildGraph(preview ? 10 : 18);
  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    styles: {
      nodes: { x: { attribute: 'x' }, y: { attribute: 'y' }, size: 2.6, color: '#277da1', label: { attribute: 'label' } },
      edges: { color: '#ccc', size: 0.3 },
    },
  });

  let dead = false;
  let url: string | null = null;

  /** Render the export, optionally stamp it, then show it as an <img>. */
  const render = async (opts: { watermark: boolean; highlight: boolean }): Promise<void> => {
    const canvas = await drawOnCanvas(renderer, {
      backgroundColor: '#ffffff',
      width: 960,
      height: 540,
      // Middleware: runs on the temporary renderer before its stage canvas is drawn.
      withTempRenderer: opts.highlight
        ? (tmp) => {
            const important = graph.filterNodes((_n, attrs) => Boolean(attrs['important']));
            tmp.setNodesState(important, { isHovered: true });
          }
        : null,
    });
    if (opts.watermark) {
      // The result is a plain canvas, so the 2D API applies.
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.font = '600 28px sans-serif';
        ctx.fillStyle = 'rgba(34, 34, 34, 0.85)';
        ctx.fillText('My Graph', 24, 46);
        ctx.font = '16px sans-serif';
        ctx.fillStyle = 'rgba(34, 34, 34, 0.55)';
        ctx.fillText(`${graph.order} nodes, ${graph.size} edges`, 24, 72);
      }
    }
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (dead || !blob) return;
    if (url) URL.revokeObjectURL(url);
    url = URL.createObjectURL(blob);
    img.src = url;
    img.hidden = false;
    caption.textContent = [opts.watermark && 'watermark', opts.highlight && 'withTempRenderer'].filter(Boolean).join(' + ') || 'plain export';
  };

  let timer = 0;
  if (preview) {
    const steps = [
      { watermark: false, highlight: false },
      { watermark: true, highlight: false },
      { watermark: true, highlight: true },
    ];
    let i = 0;
    const next = (): void => {
      const step = steps[i++ % steps.length];
      if (step) void render(step).catch(() => undefined);
    };
    next();
    timer = window.setInterval(next, 2200);
  } else {
    const row = controlsRow(el);
    const go = (opts: { watermark: boolean; highlight: boolean }) => (): void => void render(opts).catch(() => undefined);
    button(row, 'Plain export', go({ watermark: false, highlight: false }));
    button(row, 'Draw a watermark', go({ watermark: true, highlight: false }));
    button(row, 'Middleware: hover important nodes', go({ watermark: false, highlight: true }));
    button(row, 'Both', go({ watermark: true, highlight: true }));
    readout(row, 'Each button renders the export (960 x 540) into the image on the right.');
    void render({ watermark: true, highlight: false }).catch(() => undefined);
  }

  return () => {
    dead = true;
    window.clearInterval(timer);
    if (url) URL.revokeObjectURL(url);
    renderer.kill();
  };
};

export default mount;
