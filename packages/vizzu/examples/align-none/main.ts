// Vizzu example: align: 'none' returns a stretched chart to the default alignment
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  // The tutorial's setup_c state, written out in full (plus whatever this step starts from).
  await chart.animate({
    data: musicData,
    config: {
      title: 'Align: stretch = % view',
      channels: {
        y: { set: ['Popularity', 'Kinds'], align: 'stretch' },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: 'y: align none, the default',
      run: (c) =>
        c.animate({
          config: {
            title: 'Align: none - default',
            channels: { y: { align: 'none' } },
          },
        }),
      hold: 2600,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
