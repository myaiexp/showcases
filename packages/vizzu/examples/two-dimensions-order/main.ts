// Vizzu example: two dimensions on x: their order decides the grouping
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
    config: { title: 'Genres and Kinds on the stacked chart', channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } } },
  });

  stage.story(chart, [
    {
      say: "Kinds leaves y; x: set [Genres, Kinds]",
      run: (c) => c.animate({ config: { title: 'With two discretes on one axis...', channels: { y: { detach: ['Kinds'] }, x: { set: ['Genres', 'Kinds'] } } } }),
    },
    {
      say: "x: set [Kinds, Genres]",
      run: (c) => c.animate({ config: { title: '...grouping is determined by their order.', channels: { x: { set: ['Kinds', 'Genres'] } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
