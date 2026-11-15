// Vizzu example: detach a dimension, then coordSystem: 'polar' with a range on the dimension axis
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
      title: 'Merge',
      channels: {
        y: { set: ['Kinds'] },
        x: { set: ['Genres', 'Popularity'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: 'x: detach Genres, the kinds are summed',
      run: (c) =>
        c.animate({
          config: { title: 'Aggregate', channels: { x: { detach: ['Genres'] } } },
        }),
    },
    {
      say: 'coordSystem polar, y range min -30%',
      run: (c) =>
        c.animate({
          config: {
            title: 'Polar coordinates',
            channels: { y: { range: { min: '-30%' } } },
            coordSystem: 'polar',
          },
        }),
      hold: 3000,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
