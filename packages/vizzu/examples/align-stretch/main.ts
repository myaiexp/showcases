// Vizzu example: align: 'stretch' on the y channel turns a stacked chart into proportions
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
      title: "Align: center",
      channels: {
        y: { set: ['Popularity', 'Kinds'], align: 'center', labels: false },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: "y: align stretch, axis labels back on",
      run: (c) => c.animate({
        config: {
          title: 'Align: stretch = % view',
          channels: { y: { align: 'stretch', labels: true } },
        },
      }),
      hold: 2600,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
