// legendgroup across subplots: showlegend false on the repeats keeps one entry each
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const COLORS = { a: 'rgba(102,194,165,1)', b: 'rgba(252,141,98,1)', c: 'rgba(141,160,203,1)' } as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  const bar = (name: 'a' | 'b' | 'c', y: number, second: boolean): Plotly.Data => ({
    x: [name],
    y: [y],
    legendgroup: name,
    marker: { color: COLORS[name], line: { color: 'transparent' } },
    name,
    showlegend: !second,
    type: 'bar',
    xaxis: second ? 'x2' : 'x',
    yaxis: second ? 'y2' : 'y',
  });

  await Plotly.newPlot(
    stage.div,
    [bar('a', 2, false), bar('b', 3, false), bar('c', 2, false), bar('a', 4, true), bar('b', 2, true), bar('c', 4, true)],
    {
      template: stage.template,
      hovermode: 'closest',
      showlegend: true,
      margin: stage.preview ? undefined : { r: 10, t: 25, b: 40, l: 60 },
      xaxis: { anchor: 'y', categoryorder: 'array', domain: [0, 1], type: 'category', showgrid: false, showticklabels: false },
      xaxis2: { anchor: 'y2', categoryorder: 'array', domain: [0, 1], type: 'category', showgrid: false },
      yaxis: { anchor: 'x', domain: [0.52, 1], showgrid: false },
      yaxis2: { anchor: 'x2', domain: [0, 0.48], showgrid: false },
    } as Partial<Layout>,
    stage.config,
  );
  if (stage.preview) {
    stage.every(1200, (i) => {
      void restyle(stage.div, { visible: true }, [0, 1, 2, 3, 4, 5]);
      const group = i % 4;
      if (group < 3) void restyle(stage.div, { visible: 'legendonly' }, [group, group + 3]);
    });
  }
  return () => stage.dispose();
};

export default mount;
