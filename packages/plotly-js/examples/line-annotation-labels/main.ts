// direct line labels: paper-anchored annotations placed at each line's first and last y
import Plotly from 'plotly.js';
import type { Data, Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { toggle } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';
import { palette } from '../../shared/theme.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  const p = palette();
  const small = stage.preview;

  const years = [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013];
  const yData = [
    [74, 82, 80, 74, 73, 72, 74, 70, 70, 66, 66, 69],
    [45, 42, 50, 46, 36, 36, 34, 35, 32, 31, 31, 28],
    [13, 14, 20, 24, 20, 24, 24, 40, 35, 41, 43, 50],
    [18, 21, 18, 21, 16, 14, 13, 18, 17, 16, 19, 23],
  ];
  // The docs' near-black greys vanish on a dark page, so the greys are lightened.
  const colors = ['#d4d4d8', '#a1a1aa', '#38bdf8', '#71717a'];
  const lineSize = [2, 2, 4, 2];
  const labels = ['Television', 'Newspaper', 'Internet', 'Radio'];

  const data: Data[] = [];
  yData.forEach((ys, i) => {
    data.push(
      { x: years, y: ys, type: 'scatter', mode: 'lines', line: { color: colors[i], width: lineSize[i] } },
      { x: [years[0] as number, years[11] as number], y: [ys[0] as number, ys[11] as number], type: 'scatter', mode: 'markers', marker: { color: colors[i], size: small ? 7 : 12 } },
    );
  });

  const annotations: NonNullable<Partial<Layout>['annotations']> = [];
  if (!small) {
    annotations.push(
      { xref: 'paper', yref: 'paper', x: 0, y: 1.05, xanchor: 'left', yanchor: 'bottom', text: 'Main Source for News', font: { size: 26, color: p.fg1 }, showarrow: false },
      { xref: 'paper', yref: 'paper', x: 0.5, y: -0.1, xanchor: 'center', yanchor: 'top', text: 'Source: Pew Research Center & Storytelling with data', showarrow: false, font: { size: 12, color: p.fg3 } },
    );
  }
  yData.forEach((ys, i) => {
    const first = ys[0] as number;
    const last = ys[11] as number;
    annotations.push(
      { xref: 'paper', x: 0.05, y: first, xanchor: 'right', yanchor: 'middle', text: small ? `${first}%` : `${labels[i]} ${first}%`, showarrow: false, font: { size: small ? 9 : 16, color: p.fg1 } },
      { xref: 'paper', x: 0.95, y: last, xanchor: 'left', yanchor: 'middle', text: `${last}%`, showarrow: false, font: { size: small ? 9 : 16, color: p.fg1 } },
    );
  });

  await Plotly.newPlot(
    stage.div,
    data,
    {
      template: stage.template,
      showlegend: false,
      xaxis: { showline: true, showgrid: false, showticklabels: true, linecolor: '#52525b', linewidth: 2, tickmode: 'linear', ticks: 'outside', tickcolor: '#52525b', tickwidth: 2, ticklen: 5 },
      yaxis: { showgrid: false, zeroline: false, showline: false, showticklabels: false },
      margin: small ? { l: 50, r: 36, t: 10, b: 28 } : { l: 100, r: 20, t: 100, b: 80 },
      annotations,
    },
    stage.config,
  );

  // Highlight one line at a time (thick and bright), the way the docs thicken the Internet line.
  const focus = (k: number): void => {
    const widths = data.flatMap((_, j) => (j % 2 === 0 ? [j / 2 === k ? 5 : 1.5] : []));
    void restyle(stage.div, { 'line.width': widths }, [0, 2, 4, 6]);
  };
  if (stage.preview) stage.every(1300, (i) => focus(i % 4));
  if (stage.bar) toggle(stage.bar, 'Highlight Internet (the docs\' 4px line)', false, (on) => focus(on ? 2 : -1));

  return () => stage.dispose();
};

export default mount;
