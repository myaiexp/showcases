// Vizzu example: records written as objects keyed by series name
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import type { Data } from 'vizzu';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  // Each record names its values: the order of the keys does not matter.
  const data: Data.TableByRecords = {
    series: [
      { name: 'Genres', type: 'dimension' },
      { name: 'Kinds', type: 'dimension' },
      { name: 'Popularity', type: 'measure' },
    ],
    records: [
      { Genres: 'Pop', Kinds: 'Hard', Popularity: 114 },
      { Popularity: 96, Kinds: 'Hard', Genres: 'Rock' },
      { Genres: 'Jazz', Kinds: 'Hard', Popularity: 78 },
      { Genres: 'Metal', Kinds: 'Hard', Popularity: 52 },
      { Genres: 'Pop', Kinds: 'Smooth', Popularity: 56 },
      { Genres: 'Rock', Kinds: 'Experimental', Popularity: 36 },
      { Genres: 'Jazz', Kinds: 'Smooth', Popularity: 174 },
      { Genres: 'Metal', Kinds: 'Smooth', Popularity: 121 },
      { Genres: 'Pop', Kinds: 'Experimental', Popularity: 127 },
      { Genres: 'Rock', Kinds: 'Experimental', Popularity: 83 },
      { Genres: 'Jazz', Kinds: 'Experimental', Popularity: 94 },
      { Genres: 'Metal', Kinds: 'Experimental', Popularity: 58 },
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
