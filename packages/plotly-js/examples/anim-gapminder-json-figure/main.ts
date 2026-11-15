// Plotly.newPlot with a whole figure ({data, layout, frames}) read from the docs' JSON
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { json } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

interface Figure {
  data: object[];
  frames: { name: string }[];
  layout: Record<string, unknown>;
}

const mount: Mount = async (el, ctx) => {
  const fig = await json<Figure>('animations/gapminder-with-frames.json');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 520 });
  // The JSON carries a chart-studio-only "slider" key; sliders and updatemenus are Plotly's own.
  const { slider: _studio, updatemenus, sliders, ...layout } = fig.layout;
  void _studio;

  await Plotly.newPlot(stage.div, {
    data: fig.data,
    frames: fig.frames,
    layout: {
      template: stage.template,
      ...layout,
      hovermode: 'closest',
      margin: stage.preview ? undefined : { b: 130 },
      ...(stage.preview ? {} : { updatemenus, sliders }),
    },
    config: stage.config,
  } as never);

  // Cards play the frames by name, a year every 700 ms.
  if (stage.preview) {
    stage.every(700, (i) => {
      const name = fig.frames[i % fig.frames.length]!.name;
      void Plotly.animate(stage.div, [name], { mode: 'immediate', transition: { duration: 600 }, frame: { duration: 600, redraw: false } }).catch(() => {});
    });
  }

  return () => stage.dispose();
};

export default mount;
