// Vizzu example: config.title adds a title above the plot
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
      say: "title: 'My first chart'",
      run: (c) => c.animate({ config: { title: 'My first chart' } }),
    },
    {
      say: 'title: null removes it and gives the space back',
      run: (c) => c.animate({ config: { title: null } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
