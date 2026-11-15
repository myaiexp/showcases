// Vizzu example: a data set written column by column, as series with values
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import type { Data } from 'vizzu';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  // One object per series, column after column.
  const data: Data.TableBySeries = {
    series: [
      {
        name: 'Genres',
        type: 'dimension',
        values: [
          'Pop',
          'Rock',
          'Jazz',
          'Metal',
          'Pop',
          'Rock',
          'Jazz',
          'Metal',
          'Pop',
          'Rock',
          'Jazz',
          'Metal',
        ],
      },
      {
        name: 'Kinds',
        type: 'dimension',
        values: [
          'Hard',
          'Hard',
          'Hard',
          'Hard',
          'Smooth',
          'Experimental',
          'Smooth',
          'Smooth',
          'Experimental',
          'Experimental',
          'Experimental',
          'Experimental',
        ],
      },
      { name: 'Popularity', type: 'measure', values: [114, 96, 78, 52, 56, 36, 174, 121, 127, 83, 94, 58] },
    ],
  };

  // The data goes into the first animate() call.
  await chart.animate({
    data,
    config: { channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } } },
  });

  stage.story(chart, [
    {
      say: 'Kinds stacks on the y-axis',
      run: (c) =>
        c.animate({
          config: { channels: { y: { set: ['Popularity', 'Kinds'] }, color: { set: ['Kinds'] } } },
        }),
    },
    {
      say: 'Kinds moves to the x-axis: grouped columns',
      run: (c) =>
        c.animate({
          config: {
            channels: {
              y: { set: ['Popularity'] },
              x: { set: ['Genres', 'Kinds'] },
              color: { set: ['Kinds'] },
            },
          },
        }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
