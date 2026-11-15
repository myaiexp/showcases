// Vizzu example: a dimension given as a category list plus numeric indexes
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import type { Data } from 'vizzu';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  const data: Data.TableBySeries = {
    series: [
      // values are positions in `categories`, not labels.
      { name: 'Genres', categories: ['Pop', 'Rock', 'Jazz', 'Metal'], values: [0, 1, 2, 3, 0, 1, 2, 3] },
      { name: 'Kinds', categories: ['Hard', 'Smooth'], values: [0, 0, 0, 0, 1, 1, 1, 1] },
      { name: 'Popularity', type: 'measure', values: [114, 96, 78, 52, 56, 36, 174, 121] },
    ],
  };

  await chart.animate({
    data,
    config: { channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } } },
  });

  stage.story(chart, [
    {
      say: 'Genres and Kinds hold indexes; the chart shows their category names',
      run: (c) =>
        c.animate({
          config: { channels: { y: { set: ['Popularity', 'Kinds'] }, color: { set: ['Kinds'] } } },
        }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
