// Vizzu example: style.plot.xAxis.label.orientation and angle rotate axis labels
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
      title: 'Axis label rotation',
      channels: { x: { set: ['Genres'] }, y: { set: ['Popularity'] } },
    },
  });

  stage.story(chart, [
    {
      say: "plot.xAxis.label.orientation: 'vertical'",
      run: (c) => c.animate({ style: { plot: { xAxis: { label: { orientation: 'vertical' } } } } }),
    },
    {
      say: "orientation: 'horizontal', angle: '-30deg'",
      run: (c) =>
        c.animate({ style: { plot: { xAxis: { label: { orientation: 'horizontal', angle: '-30deg' } } } } }),
    },
    {
      say: "orientation: 'horizontal', angle: 0",
      run: (c) =>
        c.animate({ style: { plot: { xAxis: { label: { orientation: 'horizontal', angle: 0 } } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
