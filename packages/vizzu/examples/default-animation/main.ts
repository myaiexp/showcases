// Vizzu example: with no options, Vizzu times the animation itself
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
    config: { title: 'Default options', channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } } },
  });

  stage.story(chart, [
    { say: 'x: attach Kinds, y: detach Kinds, no options', run: (c) => c.animate(toGrouped) },
    { say: 'the reverse, still no options', run: (c) => c.animate(toStacked) },
  ]);
  return () => stage.dispose();
};

export default mount;
