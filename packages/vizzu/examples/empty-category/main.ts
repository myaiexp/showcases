// Vizzu example: '' as a dimension value is a category without a name
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import type { Data } from 'vizzu';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  // null, undefined and empty cells are errors: use '' for a dimension and 0 for a measure.
  const data: Data.TableByRecords = {
    series: [
      { name: 'Genres', type: 'dimension' },
      { name: 'Kinds', type: 'dimension' },
      { name: 'Popularity', type: 'measure' },
    ],
    records: [
      ['Pop', 'Hard', 114],
      ['Rock', 'Hard', 96],
      ['', 'Hard', 78],
      ['Metal', 'Hard', 0],
      ['Pop', 'Smooth', 56],
      ['Rock', 'Smooth', 0],
      ['', 'Smooth', 174],
      ['Metal', 'Smooth', 121],
    ],
  };

  await chart.animate({
    data,
    config: { channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } } },
  });

  stage.story(chart, [
    {
      say: "'' makes the unlabelled third category; the 0 records add nothing to their columns",
      run: (c) =>
        c.animate({ config: { channels: { y: { set: ['Popularity', 'Kinds'] }, color: { set: ['Kinds'] } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;

