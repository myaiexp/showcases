// tickvals and ticktext put words on chosen dates of a time axis
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const VALS = ['2007-01-01', '2007-09-01', '2008-01-01', '2008-09-01', '2009-01-01', '2010-01-01', '2011-01-01', '2011-02-14', '2012-01-01', '2013-01-01', '2014-01-01', '2015-01-01', '2016-01-01'];
const TEXT = ['2007', 'Financial Crisis Starts', '2008', 'Financial Crisis Ends', '2009', '2010', '2011', 'IBM wins Jeopardy!', '2012', '2013', '2014', '2015', '2016'];
// A card has little room: only the year names that fit.
const SHORT = ['2007', 'Crisis', '2008', 'Recovery', '2009', '2010', '2011', 'Jeopardy!', '2012', '2013', '2014', '2015', '2016'];

const mount: Mount = async (el, ctx) => {
  const rows = await csv('stockdata.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 440 });

  await Plotly.newPlot(
    stage.div,
    [{ x: unpack(rows, 'Date'), y: unpackNum(rows, 'IBM'), mode: 'markers', marker: { size: stage.preview ? 4 : 7, line: { width: 0.5 }, opacity: 0.8 }, type: 'scatter' }],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'IBM Stock Data: Jan 2007 - Mar 2016' },
      xaxis: { tickvals: VALS, ticktext: stage.preview ? SHORT : TEXT, tickangle: stage.preview ? 0 : 'auto' },
    },
    stage.config,
  );
  const names = (on: boolean): Promise<void> => relayout(stage.div, { 'xaxis.ticktext': on ? (stage.preview ? SHORT : TEXT) : VALS.map((v) => v.slice(0, 4)) });
  if (stage.bar) toggle(stage.bar, 'ticktext', true, (v) => void names(v));
  if (stage.preview) stage.every(1500, (i) => void names(i % 2 === 0));
  return () => stage.dispose();
};

export default mount;
