// toImage renders the plot to a data URL; downloadImage saves the same output
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button, readout, select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const FORMATS = ['png', 'jpeg', 'webp', 'svg', 'full-json'] as const;
type Format = (typeof FORMATS)[number];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 320, previewHeight: 200 });
  const t = Array.from({ length: 60 }, (_, i) => i / 6);
  await Plotly.newPlot(
    stage.div,
    [{ x: t, y: t.map((v) => Math.sin(v) * Math.exp(-v / 8)), fill: 'tozeroy', line: { color: '#34d399' } }],
    // An opaque paper: an image has no page behind it.
    { template: stage.template, paper_bgcolor: '#171a21', plot_bgcolor: '#171a21', title: { text: stage.preview ? '' : 'Exported plot' } },
    stage.config,
  );

  // The output appears beside the plot in the card, below it in the full view.
  const img = document.createElement('img');
  img.className = stage.preview ? 'shot shot-card' : 'shot';
  el.append(img);
  const out = stage.preview ? null : readout(el);
  let format: Format = 'png';

  const render = async (): Promise<void> => {
    // toImage takes the div and an object of image properties; full-json returns the figure.
    const url = await Plotly.toImage(stage.div, { format, width: 800, height: 400, ...(format === 'full-json' ? { imageDataOnly: true } : {}) } as Plotly.ToImgopts);
    if (format === 'full-json') {
      img.hidden = true;
      if (out) out.textContent = `${url.slice(0, 1200)}…`;
    } else {
      img.hidden = false;
      img.src = url;
      if (out) out.textContent = `${format}: ${url.length.toLocaleString()} characters, starting ${url.slice(0, 40)}…`;
    }
  };

  if (stage.bar) {
    select(stage.bar, 'format', FORMATS, format, (f) => {
      format = f;
      void render();
    });
    button(stage.bar, 'Plotly.downloadImage', () => {
      if (format !== 'full-json') void Plotly.downloadImage(stage.div, { format, width: 800, height: 600, filename: 'newplot' });
    });
  }
  await render();
  if (stage.preview) stage.every(2000, (i) => {
    format = FORMATS[i % 4]!;
    void render();
  });

  return () => {
    img.remove();
    out?.remove();
    stage.dispose();
  };
};

export default mount;
