// Plotly.toImage at a chosen size and format, shown beside the live plot
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { readout, select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const FORMATS = ['jpeg', 'png', 'webp', 'svg'] as const;
type Format = (typeof FORMATS)[number];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 320 });
  // The docs' two scatter traces, with an opaque paper because an image has no page behind it.
  await Plotly.newPlot(
    stage.div,
    [
      { x: [3, 9, 8, 10, 4, 6, 5], y: [5, 7, 6, 7, 8, 9, 8], type: 'scatter' },
      { x: [3, 4, 1, 6, 8, 9, 5], y: [4, 2, 5, 2, 1, 7, 3], type: 'scatter' },
    ],
    { template: stage.template, paper_bgcolor: '#171a21', plot_bgcolor: '#171a21', title: { text: stage.preview ? '' : 'Simple JavaScript Graph' } },
    stage.config,
  );

  const holder = document.createElement('div');
  holder.className = 'se-holder';
  const img = document.createElement('img');
  img.alt = 'the exported plot';
  holder.append(img);
  el.append(holder);
  const out = stage.preview ? null : readout(el);
  const opt = { format: 'jpeg' as Format, width: 300, height: 300 };

  const render = async (): Promise<void> => {
    const url = await Plotly.toImage(stage.div, { ...opt });
    if (ctx.signal.aborted) return;
    img.src = url;
    // The image keeps its own pixel size, so the picture shows what width and height do.
    img.style.width = `${opt.width / (stage.preview ? 3 : 1.5)}px`;
    if (out) out.textContent = `Plotly.toImage(gd, ${JSON.stringify(opt)}) -> ${url.length.toLocaleString()} characters of data URL`;
  };
  await render();

  if (stage.bar) {
    select(stage.bar, 'format', FORMATS, opt.format, (v) => ((opt.format = v), void render()));
    slider(stage.bar, 'width', [150, 700, 50], opt.width, (v) => ((opt.width = v), void render()));
    slider(stage.bar, 'height', [150, 500, 50], opt.height, (v) => ((opt.height = v), void render()));
  } else {
    stage.every(1600, (i) => {
      opt.width = [300, 500, 200, 400][i % 4]!;
      opt.height = [300, 250, 300, 200][i % 4]!;
      opt.format = FORMATS[i % 4]!;
      void render();
    });
  }
  return () => {
    holder.remove();
    out?.remove();
    stage.dispose();
  };
};

export default mount;
