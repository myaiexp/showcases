// Vizzu example: series without a type: the first value decides
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import type { Data } from 'vizzu';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, {
    hint: 'The panel lists what chart.data reports for each series.',
  });
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  // No `type` anywhere: strings start Genres and Kinds, numbers start Popularity.
  const data: Data.TableBySeries = {
    series: [
      { name: 'Genres', values: ['Pop', 'Rock', 'Jazz', 'Metal', 'Pop', 'Rock', 'Jazz', 'Metal'] },
      { name: 'Kinds', values: ['Hard', 'Hard', 'Hard', 'Hard', 'Smooth', 'Smooth', 'Smooth', 'Smooth'] },
      { name: 'Popularity', values: [114, 96, 78, 52, 56, 36, 174, 121] },
    ],
  };

  await chart.animate({
    data,
    config: { channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } } },
  });

  const types = chart.data.series.map((s: Data.SeriesInfo) => `${s.name}: ${s.type}`);
  const side = stage.side();
  if (side) side.textContent = `Types Vizzu chose\n\n${types.join('\n')}`;

  stage.story(chart, [
    {
      say: `Untyped series became: ${types.join(', ')}`,
      run: (c) =>
        c.animate({
          config: { channels: { y: { set: ['Popularity', 'Kinds'] }, color: { set: ['Kinds'] } } },
        }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
