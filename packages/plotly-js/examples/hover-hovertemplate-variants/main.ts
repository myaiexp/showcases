// hovertemplate variants: %{y:$.2f}, %{text}, and <extra></extra> to hide or rename the trace box
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { at } from '../../shared/events-kit.ts';
import { select } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';
import { Fx } from '../../shared/fx.ts';
import { createStage } from '../../shared/stage.ts';

const VARIANTS = {
  docs: ['<i>Price</i>: $%{y:.2f}<br><b>X</b>: %{x}<br><b>%{text}</b>', 'Price: %{y:$.2f}<extra></extra>'],
  'extra name': ['%{text}: %{y:.1f}<extra>series A</extra>', '%{y:.1f}<extra>series B</extra>'],
  'number formats': ['%{y:,.3f} (%{y:.0%})', '%{y:+.2e}<br>x = %{x:03d}<extra></extra>'],
} as const;
type Variant = keyof typeof VARIANTS;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const names = Object.keys(VARIANTS) as Variant[];

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'scatter', mode: 'lines+markers', x: [1, 2, 3, 4, 5], y: [2.02825, 1.63728, 6.83839, 4.8485, 4.73463], hovertemplate: [...VARIANTS.docs][0]!, text: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'], showlegend: false },
      { type: 'scatter', x: [1, 2, 3, 4, 5], y: [3.02825, 2.63728, 4.83839, 3.8485, 1.73463], hovertemplate: [...VARIANTS.docs][1]!, showlegend: false },
    ],
    { template: stage.template, hovermode: 'closest', title: stage.preview ? undefined : { text: 'Set hover text with hovertemplate' } },
    stage.config,
  );

  const apply = (v: Variant): void => {
    void restyle(stage.div, { hovertemplate: [...VARIANTS[v]] });
  };
  if (stage.bar) select(stage.bar, 'hovertemplate', names, 'docs', apply);
  if (stage.preview) {
    stage.every(1500, (i) => {
      apply(at(names, Math.floor(i / 2)));
      Fx.hover(stage.div, { curveNumber: i % 2, pointNumber: (i * 2) % 5 });
    });
  }

  return () => stage.dispose();
};

export default mount;
