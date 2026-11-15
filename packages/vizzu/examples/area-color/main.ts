// Vizzu example: style.plot.areaColor fills the area inside the axes
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
      title: 'Plot area colour',
      channels: { x: { set: ['Genres'] }, y: { set: ['Popularity'] }, label: { set: ['Popularity'] } },
    },
  });

  stage.story(chart, [
    {
      say: "plot.areaColor: '#3b2f63'",
      run: (c) => c.animate({ style: { plot: { areaColor: '#3b2f63' } } }),
    },
    {
      say: "plot.areaColor: '#1f4d3a'",
      run: (c) => c.animate({ style: { plot: { areaColor: '#1f4d3a' } } }),
    },
    {
      say: 'plot.areaColor: null',
      run: (c) => c.animate({ style: { plot: { areaColor: null } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
