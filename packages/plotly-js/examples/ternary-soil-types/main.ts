// The twelve soil texture classes as outlines on a clay, sand and silt ternary plot
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { Fx } from '../../shared/fx.ts';
import { soilClasses } from '../../shared/sci-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 560 });
  const classes = soilClasses();

  const axis = (title: string) => ({
    title: { text: title },
    ticksuffix: '%',
    min: 0.01, // the docs' tiny minimum keeps the corner points inside the triangle
    linewidth: 2,
    ticks: 'outside' as const,
    ticklen: 8,
    showgrid: true,
  });

  await Plotly.newPlot(
    stage.div,
    classes.map((c) => ({
      type: 'scatterternary' as const,
      mode: 'lines' as const,
      name: c.name,
      // each outline repeats its first corner so the line closes into a polygon
      a: [...c.clay, ...c.clay.slice(0, 1)],
      b: [...c.sand, ...c.sand.slice(0, 1)],
      c: [...c.silt, ...c.silt.slice(0, 1)],
      line: { color: '#f87171' },
    })),
    {
      template: stage.template,
      ternary: { sum: 100, aaxis: axis('Clay'), baxis: axis('Sand'), caxis: axis('Silt') },
      showlegend: false,
    },
    stage.config,
  );

  // Hover moves from class to class, naming each in turn.
  if (stage.preview) stage.every(900, (i) => Fx.hover(stage.div, { curveNumber: i % classes.length, pointNumber: 0 }));

  return () => stage.dispose();
};

export default mount;
