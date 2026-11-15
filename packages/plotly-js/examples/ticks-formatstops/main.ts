// tickformatstops: one tick format per range of dtick, chosen as the axis is zoomed
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const STOPS = [
  { dtickrange: [null, 1000], value: '%H:%M:%S.%L ms' },
  { dtickrange: [1000, 60000], value: '%H:%M:%S s' },
  { dtickrange: [60000, 3600000], value: '%H:%M m' },
  { dtickrange: [3600000, 86400000], value: '%H:%M h' },
  { dtickrange: [86400000, 604800000], value: '%e. %b d' },
  { dtickrange: [604800000, 'M1'], value: '%e. %b w' },
  { dtickrange: ['M1', 'M12'], value: "%b '%y M" },
  { dtickrange: ['M12', null], value: '%Y Y' },
];
// Each zoom is a date range; the tick spacing Plotly picks for it decides which stop applies.
const ZOOMS: [string, string][] = [
  ['2005-01-01', '2005-07-31'],
  ['2005-02-01', '2005-04-15'],
  ['2005-03-01', '2005-03-20'],
  ['2005-03-10', '2005-03-12'],
  ['2005-03-10 06:00', '2005-03-10 18:00'],
  ['2005-03-10 12:00', '2005-03-10 12:05'],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  await Plotly.newPlot(
    stage.div,
    [{ x: ['2005-01', '2005-02', '2005-03', '2005-04', '2005-05', '2005-06', '2005-07'], y: [-20, 10, -5, 0, 5, -10, 20], type: 'scatter', marker: { size: 8 } }],
    { template: stage.template, xaxis: { tickformatstops: STOPS, range: ZOOMS[0] } } as Partial<Layout>,
    stage.config,
  );
  const zoom = (n: number): Promise<void> => relayout(stage.div, { 'xaxis.range': ZOOMS[n] });
  if (stage.bar) {
    ZOOMS.forEach((_, n) => button(stage.bar as HTMLElement, `zoom ${n + 1}`, () => void zoom(n)));
  }
  // Ping-pong through the zoom levels.
  if (stage.preview) stage.every(1500, (i) => void zoom(Math.abs(((i + 5) % 10) - 5)));
  return () => stage.dispose();
};

export default mount;
