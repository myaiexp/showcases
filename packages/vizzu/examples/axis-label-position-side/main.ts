// Vizzu example: style.plot.xAxis.label.position and side move axis labels
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
      title: 'Axis label position and side',
      channels: { x: { set: ['Genres'] }, y: { set: ['Popularity'] } },
    },
  });

  stage.story(chart, [
    {
      say: "plot.xAxis.label.side: 'positive'",
      run: (c) => c.animate({ style: { plot: { xAxis: { label: { side: 'positive' } } } } }),
    },
    {
      say: "plot.xAxis.label.position: 'max-edge', side: 'negative'",
      run: (c) =>
        c.animate({ style: { plot: { xAxis: { label: { position: 'max-edge', side: 'negative' } } } } }),
    },
    {
      say: "plot.yAxis.label.position: 'max-edge', side: 'negative'",
      run: (c) =>
        c.animate({ style: { plot: { yAxis: { label: { position: 'max-edge', side: 'negative' } } } } }),
    },
    {
      say: 'position and side set back to null on both axes',
      run: (c) =>
        c.animate({
          style: {
            plot: {
              xAxis: { label: { position: null, side: null } },
              yAxis: { label: { position: null, side: null } },
            },
          },
        }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
