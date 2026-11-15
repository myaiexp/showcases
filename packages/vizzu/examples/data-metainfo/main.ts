// Vizzu example: chart.data reports each series' categories, range, unit and length
import Vizzu from 'vizzu';
import type { Data } from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The panel prints chart.data.' });
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate({
    data: musicData,
    config: { channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } } },
  });

  // chart.data is read-only meta info, not the records themselves.
  const lines = chart.data.series.map((s: Data.SeriesInfo) =>
    s.type === 'dimension'
      ? `${s.name}: dimension, ${s.categories.length} categories (${s.categories.join(', ')}), length ${s.length}`
      : `${s.name}: measure, range ${s.range.min} to ${s.range.max}, unit ${s.unit ? `'${s.unit}'` : '(none)'}, length ${s.length}`,
  );
  const side = stage.side();
  if (side) side.textContent = lines.join('\n\n');

  stage.story(chart, [
    { say: lines[2]!, run: () => undefined },
    {
      say: lines[0]!,
      run: (c) =>
        c.animate({
          config: { channels: { y: { set: ['Popularity', 'Kinds'] }, color: { set: ['Kinds'] } } },
        }),
    },
    { say: lines[1]!, run: () => undefined },
  ]);
  return () => stage.dispose();
};

export default mount;
