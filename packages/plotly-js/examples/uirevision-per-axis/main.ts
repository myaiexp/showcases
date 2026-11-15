// xaxis.uirevision and yaxis.uirevision: reset one axis' zoom and keep the other's
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { rng } from '../../shared/stat-data.ts';
import { createStage } from '../../shared/stage.ts';
import { guiRelayout } from '../../shared/fund-util.ts';

const AXES = ['y', 'x', 'both', 'neither'] as const;
type Which = (typeof AXES)[number];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const rand = rng(11);
  const x = Array.from({ length: 12 }, (_, i) => i);
  const newData = (): Plotly.Data[] => [{ x, y: x.map((i) => Math.sin(i / 2) * 3 + rand() * 2), mode: 'lines+markers', line: { color: '#f472b6' } }];

  const rev = { x: 'x0', y: 'y0' };
  let which: Which = 'y';
  const layout = (): Partial<Plotly.Layout> => ({
    template: stage.template,
    title: { text: stage.preview ? '' : `Each update changes the uirevision of: ${which}` },
    // No layout.uirevision: each axis carries its own, and only the changed one resets.
    xaxis: { autorange: true, uirevision: rev.x },
    yaxis: { autorange: true, uirevision: rev.y },
  });
  const update = (): void => {
    if (which === 'x' || which === 'both') rev.x = `x${Math.round(rand() * 1e6)}`;
    if (which === 'y' || which === 'both') rev.y = `y${Math.round(rand() * 1e6)}`;
    void Plotly.react(stage.div, newData(), layout());
  };

  await Plotly.react(stage.div, newData(), layout(), stage.config);
  if (stage.bar) {
    select(stage.bar, 'change uirevision of', AXES, which, (v) => (which = v));
    button(stage.bar, 'Plotly.react now', update);
  }
  if (!stage.preview) stage.every(3000, update);
  else {
    stage.every(1100, (i) => {
      if (i % 2) update();
      else void guiRelayout(stage.div, { 'xaxis.range': [3, 8], 'yaxis.range': [-2, 2] });
    });
  }
  return () => stage.dispose();
};

export default mount;
