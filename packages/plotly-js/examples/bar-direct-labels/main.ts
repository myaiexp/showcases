// bar text with textposition auto/inside/outside/none, single or grouped traces
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, toggle } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';

const positions = ['auto', 'inside', 'outside', 'none'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const xValue = ['Product A', 'Product B', 'Product C'];
  const yValue = [20, 14, 23];
  const yValue2 = [24, 16, 20];

  const trace1: Data = {
    x: xValue, y: yValue, type: 'bar', text: yValue.map(String), textposition: 'auto', hoverinfo: 'none',
    marker: { color: 'rgb(158,202,225)', opacity: 0.6, line: { color: 'rgb(8,48,107)', width: 1.5 } },
  };
  const trace2: Data = {
    x: xValue, y: yValue2, type: 'bar', text: yValue2.map(String), textposition: 'auto', hoverinfo: 'none',
    visible: false,
    marker: { color: 'rgba(58,200,225,.5)', line: { color: 'rgb(8,48,107)', width: 1.5 } },
  };

  await Plotly.newPlot(
    stage.div,
    [trace1, trace2],
    { template: stage.template, title: stage.preview ? undefined : { text: 'January 2013 Sales Report' }, barmode: 'group' },
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'textposition', positions, 'auto', (p) => void restyle(stage.div, { textposition: p }));
    toggle(stage.bar, 'Second product (grouped)', false, (on) => void restyle(stage.div, { visible: on }, [1]));
  }
  if (stage.preview) stage.every(1300, (i) => {
    void restyle(stage.div, { textposition: pick(positions, i), visible: i % 8 >= 4 }, [1]);
    void restyle(stage.div, { textposition: pick(positions, i) }, [0]);
  });

  return () => stage.dispose();
};

export default mount;
