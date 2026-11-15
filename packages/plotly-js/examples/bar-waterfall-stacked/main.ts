// stacked bars with a transparent base trace make floating steps; annotations carry the amounts
import Plotly from 'plotly.js';
import type { Data, Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  const small = stage.preview;

  const xData = ['Product<br>Revenue', 'Services<br>Revenue', 'Total<br>Revenue', 'Fixed<br>Costs', 'Variable<br>Costs', 'Total<br>Costs', 'Total'];
  const yData = [400, 660, 660, 590, 400, 400, 340];
  const textList = ['$430K', '$260K', '$690K', '$-120K', '$-200K', '$-320K', '$370K'];

  const base = [0, 430, 0, 570, 370, 370, 0];
  const revenue = [430, 260, 690, 0, 0, 0, 0];
  const cost = [0, 0, 0, 120, 200, 320, 0];
  const profit = [0, 0, 0, 0, 0, 0, 370];

  const trace1: Data = { x: xData, y: base, marker: { color: 'rgba(1,1,1,0.0)' }, type: 'bar', hoverinfo: 'skip' };
  const trace2: Data = { x: xData, y: revenue, type: 'bar', marker: { color: 'rgba(55,128,191,0.7)', line: { color: 'rgba(55,128,191,1.0)', width: 2 } } };
  const trace3: Data = { x: xData, y: cost, type: 'bar', marker: { color: 'rgba(219, 64, 82, 0.7)', line: { color: 'rgba(219, 64, 82, 1.0)', width: 2 } } };
  const trace4: Data = { x: xData, y: profit, type: 'bar', marker: { color: 'rgba(50,171, 96, 0.7)', line: { color: 'rgba(50,171,96,1.0)', width: 2 } } };

  const annotations: NonNullable<Partial<Layout>['annotations']> = xData.map((x, i) => ({
    x, y: yData[i], text: textList[i], font: { family: 'Arial', size: small ? 8 : 14, color: '#f4f4f5' }, showarrow: false,
  }));

  await Plotly.newPlot(
    stage.div,
    [trace1, trace2, trace3, trace4],
    {
      template: stage.template,
      title: small ? undefined : { text: 'Annual Profit 2015' },
      barmode: 'stack',
      showlegend: false,
      annotations,
    },
    stage.config,
  );

  // Bars past step n are emptied (null), so the bridge grows left to right.
  const reveal = (n: number): void => {
    const cut = (ys: number[]): (number | null)[] => ys.map((v, i) => (i < n ? v : null));
    void restyle(stage.div, { y: [cut(base), cut(revenue), cut(cost), cut(profit)] });
    void Plotly.relayout(stage.div, { annotations: annotations.map((a, i) => ({ ...a, visible: i < n })) }).catch(() => {});
  };
  if (stage.bar) {
    let n = 7;
    button(stage.bar, 'Next step', () => reveal((n = (n % 7) + 1)));
  } else {
    if (stage.preview) stage.every(700, (i) => reveal(Math.min(7, (i % 11) + 1)));
  }

  return () => stage.dispose();
};

export default mount;
