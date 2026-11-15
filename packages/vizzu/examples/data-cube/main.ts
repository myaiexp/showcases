// Vizzu example: a data set as a data cube: dimensions, and measures as nested arrays
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  // measures[0].values[kind][genre]: one row per Kind, one column per Genre.
  const data = {
    dimensions: [
      { name: 'Genres', values: ['Pop', 'Rock', 'Jazz', 'Metal'] },
      { name: 'Kinds', values: ['Hard', 'Smooth', 'Experimental'] },
    ],
    measures: [
      {
        name: 'Popularity',
        values: [
          [114, 96, 78, 52],
          [56, 36, 174, 121],
          [127, 83, 94, 58],
        ],
      },
    ],
  };

  await chart.animate({
    data,
    config: { channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } } },
  });

  stage.story(chart, [
    {
      say: 'Kinds stacks on the y-axis',
      run: (c) =>
        c.animate({ config: { channels: { y: { set: ['Popularity', 'Kinds'] }, color: { set: ['Kinds'] } } } }),
    },
    {
      say: 'Kinds moves to the x-axis: grouped columns',
      run: (c) =>
        c.animate({
          config: { channels: { y: { set: ['Popularity'] }, x: { set: ['Genres', 'Kinds'] }, color: { set: ['Kinds'] } } },
        }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;

