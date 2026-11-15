// Vizzu example: a data set written row by row, each record an array of values
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import type { Data } from 'vizzu';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  // The series say what each position in a record means; the records hold only values.
  const data: Data.TableByRecords = {
    series: [
      { name: 'Genres', type: 'dimension' },
      { name: 'Kinds', type: 'dimension' },
      { name: 'Popularity', type: 'measure' },
    ],
    records: [
      ['Pop', 'Hard', 114],
      ['Rock', 'Hard', 96],
      ['Jazz', 'Hard', 78],
      ['Metal', 'Hard', 52],
      ['Pop', 'Smooth', 56],
      ['Rock', 'Experimental', 36],
      ['Jazz', 'Smooth', 174],
      ['Metal', 'Smooth', 121],
      ['Pop', 'Experimental', 127],
      ['Rock', 'Experimental', 83],
      ['Jazz', 'Experimental', 94],
      ['Metal', 'Experimental', 58],
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

