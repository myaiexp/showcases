// Vizzu example: a channel's title: 'auto', a custom string, or null
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
    config: { channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } } },
  });

  stage.story(chart, [
    {
      say: "y title: 'Plays per week (index)'",
      run: (c) => c.animate({ config: { channels: { y: { title: 'Plays per week (index)' } } } }),
    },
    {
      say: "x title: 'Style of music'",
      run: (c) => c.animate({ config: { channels: { x: { title: 'Style of music' } } } }),
    },
    {
      say: 'both titles null: hidden',
      run: (c) => c.animate({ config: { channels: { y: { title: null }, x: { title: null } } } }),
    },
    {
      say: "both back to 'auto': the series names",
      run: (c) => c.animate({ config: { channels: { y: { title: 'auto' }, x: { title: 'auto' } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
