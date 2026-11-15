// Vizzu example: options.title, options.legend and options.color time their own parts
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
    config: { title: 'Title, legend and color groups', channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } } },
  });

  stage.story(chart, [
    {
      say: 'title 1 s, legend 2 s after 1 s, color 2 s after 3 s',
      run: (c) => c.animate(
        { config: { title: 'Coloured by Genres', channels: { color: { set: ['Genres'] } } } },
        { title: { duration: 1 }, legend: { duration: 2, delay: 1 }, color: { duration: 2, delay: 3 } },
      ),
      hold: 1800,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
