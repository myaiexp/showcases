// The soil classes as filled ternary regions, hover on the fills or the corner points
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { Fx } from '../../shared/fx.ts';
import { select } from '../../shared/controls.ts';
import { soilClasses } from '../../shared/sci-data.ts';
import { createStage } from '../../shared/stage.ts';

const colors = ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'];
const hoverons = ['fills+points', 'fills', 'points'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 560 });
  const classes = soilClasses();
  const axis = (title: string) => ({ title: { text: title }, ticksuffix: '%', min: 0.01, linewidth: 2, ticks: 'outside' as const, ticklen: 8, showgrid: true });

  await Plotly.newPlot(
    stage.div,
    classes.map((c, i) => ({
      type: 'scatterternary' as const,
      mode: 'lines' as const,
      name: c.name,
      // fill: 'toself' needs a closed ring: the first corner is repeated at the end.
      a: [...c.clay, ...c.clay.slice(0, 1)],
      b: [...c.sand, ...c.sand.slice(0, 1)],
      c: [...c.silt, ...c.silt.slice(0, 1)],
      line: { color: '#444' },
      fill: 'toself' as const,
      fillcolor: colors[i] ?? '#ccc',
      hoveron: 'fills+points' as const,
    })),
    {
      template: stage.template,
      ternary: { sum: 100, aaxis: axis('Clay'), baxis: axis('Sand'), caxis: axis('Silt') },
      showlegend: false,
    },
    stage.config,
  );

  if (stage.bar) select(stage.bar, 'hoveron', hoverons, 'fills+points', (v) => void restyle(stage.div, { hoveron: v }));
  else stage.every(900, (i) => Fx.hover(stage.div, { curveNumber: i % classes.length, pointNumber: 0 }));

  return () => stage.dispose();
};

export default mount;
