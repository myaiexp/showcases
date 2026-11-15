// Vizzu example: the lightness channel and legend: "lightness"
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
    config: { title: 'Lightness', channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } } },
  });

  stage.story(chart, [
    {
      say: 'lightness: attach Popularity, legend: lightness',
      run: (c) =>
        c.animate({
          config: {
            title: 'Lightness - legend on',
            channels: { lightness: { attach: ['Popularity'] } },
            legend: 'lightness',
          },
        }),
      hold: 2600,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
