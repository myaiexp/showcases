// dot plot: marker traces over a categorical y axis, reordered with categoryarray
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { pick, relayout } from '../../shared/basic-util.ts';

const orders = ['as listed', 'by voting-age turnout', 'by registered turnout', 'by gap'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const country = ['Switzerland (2011)', 'Chile (2013)', 'Japan (2014)', 'United States (2012)', 'Slovenia (2014)', 'Canada (2011)', 'Poland (2010)', 'Estonia (2015)', 'Luxembourg (2013)', 'Portugal (2011)'];
  const votingPop = [40, 45.7, 52, 53.6, 54.1, 54.2, 54.5, 54.7, 55.1, 56.6];
  const regVoters = [49.1, 42, 52.7, 84.3, 51.7, 61.1, 55.3, 64.2, 91.1, 58.9];
  const size = stage.preview ? 9 : 16;

  const trace1: Data = {
    type: 'scatter', x: votingPop, y: country, mode: 'markers', name: 'Percent of estimated voting age population',
    marker: { color: 'rgba(156, 165, 196, 0.95)', line: { color: 'rgba(156, 165, 196, 1.0)', width: 1 }, symbol: 'circle', size },
  };
  const trace2: Data = {
    x: regVoters, y: country, mode: 'markers', name: 'Percent of estimated registered voters',
    marker: { color: 'rgba(204, 204, 204, 0.95)', line: { color: 'rgba(217, 217, 217, 1.0)', width: 1 }, symbol: 'circle', size },
  };

  const arrange = (how: (typeof orders)[number]): string[] => {
    const key = (i: number): number =>
      how === 'by voting-age turnout' ? (votingPop[i] as number)
      : how === 'by registered turnout' ? (regVoters[i] as number)
      : how === 'by gap' ? (regVoters[i] as number) - (votingPop[i] as number)
      : -i;
    // Categories run bottom to top, so ascending keys put the largest at the top.
    return country.map((_, i) => i).sort((a, b) => key(a) - key(b)).map((i) => country[i] as string);
  };

  await Plotly.newPlot(
    stage.div,
    [trace1, trace2],
    {
      template: stage.template,
      title: stage.preview ? undefined : { text: 'Votes cast for ten lowest voting age population in OECD countries', font: { size: 15 } },
      xaxis: { showgrid: false, showline: true, linecolor: 'rgb(102, 102, 102)', tickmode: 'linear', dtick: 10, ticks: 'outside', tickcolor: 'rgb(102, 102, 102)' },
      yaxis: { categoryorder: 'array', categoryarray: arrange('as listed') },
      margin: stage.preview ? { l: 8, r: 8, t: 8, b: 24 } : { l: 150, r: 40, b: 50, t: 80 },
      showlegend: !stage.preview,
      legend: { font: { size: 10 }, yanchor: 'bottom', y: 1.0, orientation: 'h' },
      hovermode: 'closest',
    },
    stage.config,
  );
  if (stage.preview) void relayout(stage.div, { 'yaxis.showticklabels': false });

  const apply = (how: (typeof orders)[number]): void => void relayout(stage.div, { 'yaxis.categoryarray': arrange(how) });
  if (stage.bar) select(stage.bar, 'Order countries', orders, 'as listed', apply);
  if (stage.preview) stage.every(1700, (i) => {
    const how = pick(orders, i);
    apply(how);
  });

  return () => stage.dispose();
};

export default mount;
