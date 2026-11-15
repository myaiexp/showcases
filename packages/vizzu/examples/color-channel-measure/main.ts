// Vizzu example: a measure on the color channel makes a colour range
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
      say: "color: attach Popularity (a measure)",
      run: (c) => c.animate({ config: { title: 'Color from a measure', channels: { color: { attach: ['Popularity'] } }, legend: 'color' } }),
      hold: 2600,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
