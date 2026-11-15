// Vizzu example: a channel can be just its series, y: ['Kinds', 'Popularity'], instead of { set: [...] }
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
      title: 'When you use set and no other channel options',
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: "y: ['Kinds', 'Popularity'] and x: 'Genres'",
      run: (c) =>
        c.animate({
          channels: {
            // y: { set: ['Kinds', 'Popularity'] },
            y: ['Kinds', 'Popularity'],
            // x: { set: ['Genres'] },
            x: 'Genres',
          },
        }),
    },
    {
      say: 'A channel with other options still needs the object: y: { set, range }',
      run: (c) =>
        c.animate({ channels: { y: { set: ['Popularity', 'Kinds'], range: { max: '150%' } }, x: 'Genres' } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
