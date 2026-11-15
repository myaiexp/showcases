// Vizzu example: config.subtitle and config.caption add text under the title and below the plot
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
      channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } },
      title: 'My first chart',
    },
  });

  stage.story(chart, [
    {
      say: 'subtitle and caption appear',
      run: (c) =>
        c.animate({
          config: {
            subtitle: 'with fancy animations',
            caption: 'Source: Vizzu tutorial',
          },
        }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
