// Vizzu example: a total duration rescales the group timings proportionally
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
  const groups = { y: { duration: 2, delay: 2 }, style: { duration: 2, delay: 4 } };

  await chart.animate({
    data: musicData,
    config: { title: 'Group settings alone: 6 s', channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } } },
  });

  stage.story(chart, [
    { say: 'groups only: y 2 s after 2 s, style 2 s after 4 s', run: (c) => c.animate(toGrouped, groups), hold: 1000 },
    { say: 'stacked again, default options', run: (c) => c.animate(toStacked), hold: 800 },
    { say: 'the same groups plus duration: 1, easing: "linear"', run: (c) => c.animate(toGrouped, { duration: 1, easing: 'linear', ...groups }), hold: 1600 },
  ]);
  return () => stage.dispose();
};

export default mount;
