// Vizzu example: numberFormat writes numbers as plain, grouped or prefixed on labels
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { bigData } from '../../shared/b8-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate({
    data: bigData,
    config: {
      title: 'Number format',
      channels: { x: { set: ['Country'] }, y: { set: ['Population'] }, label: { set: ['Population'] } },
    },
  });

  stage.story(chart, [
    {
      say: "plot.marker.label.numberFormat: 'none'",
      run: (c) => c.animate({ style: { plot: { marker: { label: { numberFormat: 'none' } } } } }),
    },
    {
      say: "plot.marker.label.numberFormat: 'grouped'",
      run: (c) => c.animate({ style: { plot: { marker: { label: { numberFormat: 'grouped' } } } } }),
    },
    {
      say: "plot.marker.label.numberFormat: 'prefixed'",
      run: (c) => c.animate({ style: { plot: { marker: { label: { numberFormat: 'prefixed' } } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
