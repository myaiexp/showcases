// xaxis.rangeselector buttons (backward and todate steps) with xaxis.rangeslider on a long daily series
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { at } from '../../shared/events-kit.ts';
import { csv, unpack } from '../../shared/data.ts';
import { guiRelayout } from '../../shared/fund-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('2016-weather-data-seattle.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });
  // The docs turn each Date cell into a JS Date; Plotly then reads them as a date axis.
  const x = unpack(rows, 'Date').map((d) => new Date(d));
  const y = unpack(rows, 'Mean_TemperatureC');
  const last = x[x.length - 1]!;

  await Plotly.newPlot(
    stage.div,
    [{ mode: 'lines', x, y, line: { color: '#60a5fa', width: 1 } }],
    {
      template: stage.template,
      title: stage.preview ? undefined : { text: 'Time series with range slider and selectors' },
      xaxis: {
        rangeselector: {
          buttons: [
            { step: 'month', stepmode: 'backward', count: 1, label: '1m' },
            { step: 'month', stepmode: 'backward', count: 6, label: '6m' },
            { step: 'year', stepmode: 'todate', count: 1, label: 'YTD' },
            { step: 'year', stepmode: 'backward', count: 1, label: '1y' },
            { step: 'all' },
          ],
        },
        rangeslider: { thickness: stage.preview ? 0.16 : 0.12 },
      },
      yaxis: { fixedrange: true },
    } as unknown as Partial<Layout>,
    stage.config,
  );

  // Cards walk the ranges the selector buttons would set.
  if (stage.preview) {
    const ranges = [30, 180, 365, 3000];
    stage.every(1300, (i) => {
      const days = at(ranges, i);
      void guiRelayout(stage.div, { 'xaxis.range': [new Date(last.getTime() - days * 864e5), last] });
    });
  }

  return () => stage.dispose();
};

export default mount;
