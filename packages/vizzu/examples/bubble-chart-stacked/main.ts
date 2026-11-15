// Vizzu example: geometry: 'circle' turns the treemap into bubbles
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
      title: "Treemap",
      channels: {
        y: { set: null },
        x: { set: null },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
        size: { set: ['Genres', 'Popularity'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: "geometry circle",
      run: (c) => c.animate({
        config: { title: 'Bubble chart - stacked', geometry: 'circle' },
      }),
      hold: 3000,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
