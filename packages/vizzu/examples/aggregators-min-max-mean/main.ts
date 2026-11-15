// Vizzu example: min(), max() and mean() written into the series name
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
      title: 'Sum of Popularity by Genres',
      channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } },
    },
  });

  stage.story(chart, [
    {
      say: 'min(Popularity): the smallest value in each genre',
      run: (c) =>
        c.animate({
          config: { title: 'Minimum of Popularity by Genres', channels: { y: { set: ['min(Popularity)'] } } },
        }),
    },
    {
      say: 'max(Popularity): the largest value in each genre',
      run: (c) =>
        c.animate({
          config: { title: 'Maximum of Popularity by Genres', channels: { y: { set: ['max(Popularity)'] } } },
        }),
    },
    {
      say: 'mean(Popularity): the average value in each genre',
      run: (c) =>
        c.animate({
          config: { title: 'Mean of Popularity by Genres', channels: { y: { set: ['mean(Popularity)'] } } },
        }),
    },
    {
      say: 'sum(Popularity): back to the default',
      run: (c) =>
        c.animate({
          config: { title: 'Sum of Popularity by Genres', channels: { y: { set: ['sum(Popularity)'] } } },
        }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
