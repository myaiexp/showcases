// Vizzu example: the noop channel keeps a dimension in the chart without it changing the markers
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
      title: 'Bubble chart - stacked',
      channels: {
        y: { set: null },
        x: { set: null },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
        size: { set: ['Genres', 'Popularity'] },
      },
      geometry: 'circle',
    },
  });

  stage.story(chart, [
    {
      say: 'Genres: off size, onto noop',
      run: (c) =>
        c.animate({
          config: {
            title: 'Bubble chart - grouped - using the noop channel',
            channels: { size: { detach: ['Genres'] }, noop: { set: ['Genres'] } },
          },
        }),
      hold: 3000,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
