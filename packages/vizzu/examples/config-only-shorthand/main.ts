// Vizzu example: animate({ y: {...} }) is animate({ config: { channels: { y: {...} } } }) without the wrappers
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
      title: 'When only the config property is used',
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: 'animate({ y: { align: "stretch" } }): channels sit at the top level',
      run: (c) =>
        c.animate({
          // config: {
          y: { align: 'stretch' },
          // }
        }),
    },
    {
      say: 'animate({ title }): any config property works the same way',
      run: (c) => c.animate({ title: 'No config wrapper needed' }),
    },
    {
      say: 'y align back to none, still without config',
      run: (c) => c.animate({ y: { align: 'none' } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
