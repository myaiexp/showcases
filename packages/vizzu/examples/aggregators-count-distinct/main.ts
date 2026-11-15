// Vizzu example: count() and distinct(Kinds) on the y-axis
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
      say: 'count(): how many records each genre has',
      run: (c) =>
        c.animate({ config: { title: 'Count of items by Genres', channels: { y: { set: ['count()'] } } } }),
    },
    {
      say: 'distinct(Kinds): how many different Kinds each genre has',
      run: (c) =>
        c.animate({
          config: { title: 'Distinct Kinds by Genres', channels: { y: { set: ['distinct(Kinds)'] } } },
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
