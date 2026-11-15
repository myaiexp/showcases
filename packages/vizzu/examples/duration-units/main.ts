// Vizzu example: a duration is seconds by default; strings add a unit
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
    config: { title: 'Custom unit for duration', channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } } },
  });

  stage.story(chart, [
    { say: "animate(target, '500ms')", run: (c) => c.animate(toGrouped, '500ms'), hold: 1200 },
    { say: "animate(target, '2s')", run: (c) => c.animate(toStacked, '2s') },
    { say: 'animate(target, 1.5): a number is seconds', run: (c) => c.animate(toGrouped, 1.5) },
    { say: "animate(target, { duration: '3000ms' }): the longhand form", run: (c) => c.animate(toStacked, { duration: '3000ms' }) },
  ]);
  return () => stage.dispose();
};

export default mount;
