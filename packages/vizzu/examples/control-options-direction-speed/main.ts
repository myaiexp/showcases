// Vizzu example: ControlOptions direction and speed shape playback from the first frame
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
    config: { title: 'Direction and speed', channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } } },
  });

  stage.story(chart, [
    { say: 'speed: 0.5, a 2 s animation takes 4 s', run: (c) => c.animate(toGrouped, { duration: 2, speed: 0.5 }) },
    { say: 'speed: 3, back in a fraction of the time', run: (c) => c.animate(toStacked, { duration: 3, speed: 3 }) },
    { say: 'direction: "reverse", plays from the grouped look back to the stacked one', run: (c) => c.animate(toGrouped, { duration: 3, direction: 'reverse' }) },
  ]);
  return () => stage.dispose();
};

export default mount;
