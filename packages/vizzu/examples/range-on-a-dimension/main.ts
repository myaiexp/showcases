// Vizzu example: range min and max on an x-axis that holds a dimension
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
      title: 'Axis range on a dimension, the default',
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
      say: 'x: range from -2 to 3',
      run: (c) =>
        c.animate({
          config: {
            title: 'Axis range set explicitly on an axis with discrete series',
            channels: { x: { range: { min: -2, max: 3 } } },
          },
        }),
      hold: 2800,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
