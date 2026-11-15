// Vizzu example: channels named at the top level of the config, with no channels object around them
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
      title: "You don't have to use the channel object",
      channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } },
    },
  });

  stage.story(chart, [
    {
      say: "y: 'Kinds' and x: ['Genres', 'Popularity']: Vizzu recognises channel names",
      run: (c) =>
        c.animate({
          // channels: {
          y: 'Kinds',
          x: ['Genres', 'Popularity'],
          // }
        }),
    },
    {
      say: 'Back the same way, with a title in the same object',
      run: (c) => c.animate({ title: 'Channels beside the title', y: ['Popularity', 'Kinds'], x: 'Genres' }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
