// two x axes side by side (domain 0-0.5 and 0.5-1) over one category y axis; annotations label values
import Plotly from 'plotly.js';
import type { Data, Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { toggle } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { Fx } from '../../shared/fx.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 560 });
  const small = stage.preview;
  const xSavings = [1.3586, 2.2623, 4.9822, 6.5097, 7.4812, 7.5133, 15.2148, 17.5205];
  const xNetworth = [93453.92, 81666.57, 69889.62, 78381.53, 141395.3, 92969.02, 66090.18, 122379.3];
  const countries = ['Japan', 'United Kingdom', 'Canada', 'Netherlands', 'United States', 'Belgium', 'Sweden', 'Switzerland'];

  const trace1: Data = {
    x: xSavings, y: countries, xaxis: 'x', yaxis: 'y', type: 'bar',
    marker: { color: 'rgba(50,171,96,0.6)', line: { color: 'rgba(50,171,96,1.0)', width: 1 } },
    name: 'Household savings, percentage of household disposable income', orientation: 'h',
  };
  const trace2: Data = {
    x: xNetworth, y: countries, xaxis: 'x2', yaxis: 'y', mode: 'lines+markers', line: { color: 'rgb(128,0,128)' },
    name: 'Household net worth, Million USD/capita',
  };

  const annotations: NonNullable<Partial<Layout>['annotations']> = [];
  if (!small) {
    annotations.push({
      xref: 'paper', yref: 'paper', x: -0.2, y: -0.109, showarrow: false, xanchor: 'left',
      text: 'OECD (2015), Household savings (indicator), Household net worth (indicator). doi: 10.1787/cfc6f499-en (Accessed on 05 June 2015)',
      font: { family: 'Arial', size: 10, color: 'rgb(150,150,150)' },
    });
  }
  const valueLabels = (): NonNullable<Partial<Layout>['annotations']> =>
    countries.flatMap((c, i) => [
      { xref: 'x', yref: 'y', x: (xSavings[i] as number) + 2.3, y: c, text: `${xSavings[i]}%`, font: { family: 'Arial', size: 12, color: 'rgb(50, 171, 96)' }, showarrow: false },
      { xref: 'x2', yref: 'y', x: (xNetworth[i] as number) - 20000, y: c, text: `${xNetworth[i]} M`, font: { family: 'Arial', size: 12, color: 'rgb(200, 120, 200)' }, showarrow: false },
    ] as const).map((a) => ({ ...a }));
  if (!small) annotations.push(...valueLabels());

  await Plotly.newPlot(
    stage.div,
    [trace1, trace2],
    {
      template: stage.template,
      title: small ? undefined : { text: 'Household Savings & Net Worth for Eight OECD Countries' },
      xaxis: { range: [0, 20], domain: [0, 0.5], zeroline: false, showline: false, showticklabels: true, showgrid: true },
      xaxis2: { range: [25000, 150000], domain: [0.5, 1], zeroline: false, showline: false, showticklabels: true, showgrid: true, side: 'top', dtick: 25000 },
      yaxis: { automargin: true },
      legend: { x: 0.029, y: 1.15, font: { size: 10 } },
      showlegend: !small,
      margin: small ? { l: 70, r: 8, t: 22, b: 8 } : { l: 110, r: 20, t: 130, b: 90 },
      annotations,
    },
    stage.config,
  );

  if (stage.bar) toggle(stage.bar, 'Value labels', true, (on) => void relayout(stage.div, { annotations: [...annotations.slice(0, 1), ...(on ? valueLabels() : [])] }));
  if (stage.preview) stage.every(800, (i) => Fx.hover(stage.div, { curveNumber: i % 2, pointNumber: Math.floor(i / 2) % 8 }));

  return () => stage.dispose();
};

export default mount;
