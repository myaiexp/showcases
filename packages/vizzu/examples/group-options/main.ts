// Vizzu example: options.y and options.style give one group its own duration and delay
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;
  const toGrouped = { config: { channels: { x: { attach: ['Kinds'] }, y: { detach: ['Kinds'] } } } };
  const toStacked = { config: { channels: { x: { detach: ['Kinds'] }, y: { attach: ['Kinds'] } } } };

  await chart.animate({
    data: musicData,
    config: { title: 'Custom animation settings for specific groups', channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } } },
  });

  stage.story(chart, [
    {
      say: 'y: 2 s after a 2 s delay. style: 2 s after a 4 s delay. Total 6 s',
      run: (c) => c.animate(toGrouped, { y: { duration: 2, delay: 2 }, style: { duration: 2, delay: 4 } }),
      hold: 1800,
    },
    { say: 'back with default options', run: (c) => c.animate(toStacked), hold: 1200 },
  ]);
  return () => stage.dispose();
};

export default mount;
