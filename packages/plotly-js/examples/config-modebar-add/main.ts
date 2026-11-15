// config.modeBarButtonsToAdd: custom buttons with their own icon and click handler
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

// A Font Awesome bell path in the {width, height, path} shape modebar icons take.
const BELL = {
  width: 500,
  height: 600,
  path: 'M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z',
};
const COLORS = ['#34d399', '#f472b6', '#60a5fa'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const out = stage.preview ? null : readout(el);
  let n = 0;
  const next = (gd: HTMLElement): void => {
    n = (n + 1) % COLORS.length;
    void Plotly.restyle(gd as Plotly.PlotlyHTMLElement, { 'line.color': COLORS[n] });
  };

  await Plotly.newPlot(
    stage.div,
    [{ mode: 'lines', y: [2, 1, 2], line: { color: COLORS[0], width: 4, shape: 'spline' } }],
    { template: stage.template, title: { text: stage.preview ? '' : 'Two buttons added to the modebar' } },
    {
      ...stage.config,
      displayModeBar: true,
      modeBarButtonsToAdd: [
        { name: 'color toggler', icon: BELL as never, click: next },
        {
          name: 'button1',
          icon: (Plotly as unknown as { Icons: Record<string, unknown> }).Icons.pencil as never,
          // The docs call alert() here; the click is reported under the graph instead.
          click: () => {
            if (out) out.textContent = 'button1 clicked (an icon from Plotly.Icons.pencil)';
          },
          // direction is a runtime-only button option the types leave out
          ...({ direction: 'up' } as object),
        },
      ] as never,
      modeBarButtonsToRemove: ['pan2d', 'select2d', 'lasso2d', 'resetScale2d', 'zoomOut2d'],
    },
  );
  if (out) out.textContent = 'Click the bell to cycle the line colour, the pencil to log a message.';
  if (stage.preview) stage.every(1200, () => next(stage.div));
  return () => {
    out?.remove();
    stage.dispose();
  };
};

export default mount;
