// Vizzu example: a measure on y shows the sum of its values per category
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
    config: { title: 'Sum of all Popularity values', channels: { y: { set: ['Popularity'] } } },
  });

  stage.story(chart, [
    {
      say: "One bar per genre: the sum of Popularity within each",
      run: (c) => c.animate({ config: { title: 'Sum of Popularity by Genres', channels: { x: { set: ['Genres'] } } } }),
    },
    {
      say: "The same thing, with the aggregator written out: sum(Popularity)",
      run: (c) => c.animate({ config: { title: 'sum(Popularity) by Genres', channels: { y: { set: ['sum(Popularity)'] } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
