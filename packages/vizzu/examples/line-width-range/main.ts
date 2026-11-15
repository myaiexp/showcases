// Vizzu example: lineMinWidth and lineMaxWidth bound the size channel on lines
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { salesData } from '../../shared/sample-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate({
    data: salesData,
    config: {
      title: 'Line width range',
      geometry: 'line',
      channels: {
        x: { set: ['Year'] },
        y: { set: ['Revenue'] },
        color: { set: ['Region'] },
        size: { set: ['Profit'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: 'lineMaxWidth: 0.05',
      run: (c) => c.animate({ style: { plot: { marker: { lineMaxWidth: 0.05 } } } }),
    },
    {
      say: 'lineMinWidth: 0.02, lineMaxWidth: 0.03',
      run: (c) => c.animate({ style: { plot: { marker: { lineMinWidth: 0.02, lineMaxWidth: 0.03 } } } }),
    },
    {
      say: 'lineMinWidth: null, lineMaxWidth: null',
      run: (c) => c.animate({ style: { plot: { marker: { lineMinWidth: null, lineMaxWidth: null } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
