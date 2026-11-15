// layout.images: a logo anchored to the paper's corner, drawn on a canvas so nothing is fetched
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { badge } from '../../shared/fund-util.ts';
import { createStage } from '../../shared/stage.ts';

const CHANGE = [-35.3, -15.9, -15.8, -15.6, -11.1, -9.6, -9.2, -3.5, -1.9, -0.9, 1.0, 1.4, 1.7, 2.0, 2.8, 6.2, 8.1, 8.5, 8.5, 8.6, 11.4, 12.5, 13.3, 13.7, 14.4, 17.5, 17.7, 18.9, 25.1, 28.9, 41.4];
const JOBS = ['Designers, musicians, artists, etc.', 'Secretaries and administrative assistants', 'Waiters and servers', 'Archivists, curators, and librarians', 'Sales and related', 'Childcare workers, home car workers, etc.', 'Food preparation occupations', 'Janitors, maids, etc.', 'Healthcare technicians, assistants. and aides', 'Counselors, social and religious workers', 'Physical, life and social scientists', 'Construction', 'Factory assembly workers', 'Machinists, repairmen, etc.', 'Media and communications workers', 'Teachers', 'Mechanics, repairmen, etc.', 'Financial analysts and advisers', 'Farming, fishing and forestry workers', 'Truck drivers, heavy equipment operator, etc.', 'Accountants and auditors', 'Human resources, management analysts, etc.', 'Managers', 'Lawyers and judges', 'Engineers, architects and surveyors', 'Nurses', 'Legal support workers', 'Computer programmers and system admin.', 'Police officers and firefighters', 'Chief executives', 'Doctors, dentists and surgeons'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 780 });
  const p = stage.preview;
  const logo = badge('Vox', 200); // drawn in code: the docs' source is a URL on raw.githubusercontent.com
  await Plotly.newPlot(
    stage.div,
    [{ type: 'bar', orientation: 'h', x: CHANGE, y: JOBS, name: 'y', marker: { color: 'rgb(253, 240, 54)', line: { color: 'rgb(0, 0, 0)', width: 2 } } }],
    {
      template: stage.template,
      bargap: 0.15,
      bargroupgap: 0.1,
      barmode: 'stack',
      hovermode: 'x',
      images: [{ source: logo, xref: 'paper', yref: 'paper', x: 1, y: 1.05, sizex: 0.2, sizey: 0.2, xanchor: 'right', yanchor: 'bottom' }],
      margin: p ? { l: 10, r: 10, t: 10, b: 24 } : { l: 300, r: 20, t: 125, b: 75 },
      title: { text: p ? '' : 'Moving Up, Moving Down<br><i>Percentile change in income between childhood and adulthood</i>' },
      xaxis: { dtick: 10, tick0: 0, title: { text: p ? '' : '<i>Change in percentile</i>' }, mirror: true },
      yaxis: { type: 'category', showticklabels: !p, showgrid: false, zeroline: false, mirror: true },
    },
    stage.config,
  );

  // The logo's size is a share of the paper: sizex and sizey scale it.
  const resize = (s: number): void => void Plotly.relayout(stage.div, { 'images[0].sizex': s, 'images[0].sizey': s });
  if (stage.bar) slider(stage.bar, 'images[0].sizex / sizey', [0.05, 0.4, 0.01], 0.2, resize);
  else stage.every(120, (i) => resize(0.2 + 0.1 * Math.sin(i / 6)));
  return () => stage.dispose();
};

export default mount;
