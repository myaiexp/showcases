// Vizzu example: style.plot.yAxis.ticks sets colour, width, length and position of ticks
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate({
    data: musicData,
    config: {
      title: 'Axis ticks',
      channels: { x: { set: ['Genres'] }, y: { set: ['Popularity'], ticks: true } },
    },
  });

  stage.story(chart, [
    {
      say: 'plot.yAxis.ticks: colour, lineWidth: 3, length: 14',
      run: (c) =>
        c.animate({ style: { plot: { yAxis: { ticks: { color: '#ffd54a', lineWidth: 3, length: 14 } } } } }),
    },
    {
      say: "plot.yAxis.ticks.position: 'inside'",
      run: (c) => c.animate({ style: { plot: { yAxis: { ticks: { position: 'inside' } } } } }),
    },
    {
      say: "plot.yAxis.ticks.position: 'center'",
      run: (c) => c.animate({ style: { plot: { yAxis: { ticks: { position: 'center' } } } } }),
    },
    {
      say: "plot.yAxis.ticks.position: 'outside'",
      run: (c) => c.animate({ style: { plot: { yAxis: { ticks: { position: 'outside' } } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
