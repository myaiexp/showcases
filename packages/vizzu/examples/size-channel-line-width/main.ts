// Vizzu example: the size channel sets line width when the geometry is line
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
      title: 'Line width from size',
      geometry: 'line',
      channels: { x: { set: ['Year'] }, y: { set: ['Revenue'] }, color: { set: ['Region'] } },
    },
  });

  stage.story(chart, [
    {
      say: 'size: set Profit (width follows profit)',
      run: (c) => c.animate({ config: { channels: { size: { set: ['Profit'] } } } }),
      hold: 2600,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
