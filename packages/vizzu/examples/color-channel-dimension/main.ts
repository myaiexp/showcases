// Vizzu example: a dimension on the color channel, with the colour legend
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
    config: { title: 'Color', channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } } },
  });

  stage.story(chart, [
    {
      say: 'color: attach Genres, legend: color',
      run: (c) => c.animate({ config: { channels: { color: { attach: ['Genres'] } }, legend: 'color' } }),
      hold: 2600,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
