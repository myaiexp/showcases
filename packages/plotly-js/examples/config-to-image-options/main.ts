// config.toImageButtonOptions: what the camera button downloads
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { readout, select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const FORMATS = ['png', 'svg', 'jpeg', 'webp', 'full-json'] as const;
type Format = (typeof FORMATS)[number];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const out = stage.preview ? null : readout(el);
  const opts = { format: 'svg' as Format, filename: 'custom_image', height: 500, width: 700, scale: 1 };

  const draw = (): Promise<unknown> => {
    if (out) out.textContent = `toImageButtonOptions: ${JSON.stringify(opts)}`;
    return Plotly.newPlot(
      stage.div,
      [{ x: [0, 1, 2, 3, 4, 5, 6], y: [1, 9, 4, 7, 5, 2, 4], mode: 'markers', marker: { size: [20, 40, 25, 10, 60, 90, 30], color: '#f59e0b' } }],
      { template: stage.template, title: { text: stage.preview ? '' : `Download chart as ${opts.format}` }, showlegend: false },
      { ...stage.config, displayModeBar: true, toImageButtonOptions: { ...opts } },
    );
  };
  await draw();

  if (stage.bar) {
    select(stage.bar, 'format', FORMATS, opts.format, (f) => {
      opts.format = f;
      void draw();
    });
    slider(stage.bar, 'width', [300, 1200, 50], opts.width, (v) => {
      opts.width = v;
      void draw();
    });
    slider(stage.bar, 'height', [300, 900, 50], opts.height, (v) => {
      opts.height = v;
      void draw();
    });
    slider(stage.bar, 'scale', [1, 4, 1], opts.scale, (v) => {
      opts.scale = v;
      void draw();
    });
  }
  // The card has no pointer to press the button, so the bubbles breathe instead.
  if (stage.preview) {
    stage.every(900, (i) =>
      void Plotly.restyle(stage.div, { 'marker.size': [[20, 40, 25, 10, 60, 90, 30].map((s, k) => s * (0.7 + 0.3 * Math.sin(i / 2 + k)))] }),
    );
  }
  return () => {
    out?.remove();
    stage.dispose();
  };
};

export default mount;
