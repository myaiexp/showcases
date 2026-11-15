// title.subtitle and legend.title: the other text labels of a figure
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const SUBTITLES = ['Daily readings, two stations', 'Station B was offline on day 5', 'Source: sensors 1 and 2', ''] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const x = [1, 2, 3, 4, 5, 6, 7];

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: [3, 4, 6, 5, 7, 8, 8.5], name: 'Station A', mode: 'lines+markers' },
      { x, y: [2, 3, 3.5, 5, 4.5, 6, 7], name: 'Station B', mode: 'lines+markers' },
    ],
    {
      template: stage.template,
      title: { text: 'Temperature', subtitle: { text: SUBTITLES[0], font: { size: stage.preview ? 9 : 14, color: '#a6acb8' } } },
      legend: { title: { text: 'Sensors' } },
      margin: stage.preview ? { t: 44, l: 34, r: 10, b: 24 } : { t: 90 },
    } as Partial<Layout>,
    stage.config,
  );
  if (stage.bar) select(stage.bar, 'title.subtitle.text', SUBTITLES, SUBTITLES[0], (v) => void relayout(stage.div, { 'title.subtitle.text': v }));
  if (stage.preview) stage.every(1300, (i) => void relayout(stage.div, { 'title.subtitle.text': SUBTITLES[i % 3], 'legend.title.text': ['Sensors', 'Stations', 'Series'][i % 3] }));
  return () => stage.dispose();
};

export default mount;
