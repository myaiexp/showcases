// Vizzu example: style.plot.yAxis.title position, vposition and side move an axis title
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
      title: 'Axis title position',
      channels: { x: { set: ['Genres'], title: 'Genres' }, y: { set: ['Popularity'] } },
    },
  });

  stage.story(chart, [
    {
      say: "plot.xAxis.title.vposition: 'end'",
      run: (c) => c.animate({ style: { plot: { xAxis: { title: { vposition: 'end' } } } } }),
    },
    {
      say: "plot.xAxis.title.vposition: 'begin'",
      run: (c) => c.animate({ style: { plot: { xAxis: { title: { vposition: 'begin' } } } } }),
    },
    {
      say: "plot.yAxis.title: vposition 'end', vside 'negative'",
      run: (c) =>
        c.animate({ style: { plot: { yAxis: { title: { vposition: 'end', vside: 'negative' } } } } }),
    },
    {
      say: 'vposition and vside set back to null on both axes',
      run: (c) =>
        c.animate({
          style: {
            plot: {
              xAxis: { title: { vposition: null } },
              yAxis: { title: { vposition: null, vside: null } },
            },
          },
        }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
