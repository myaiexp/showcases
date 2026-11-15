// Vizzu example: chart.feature('tooltip', true) shows a tooltip on hover
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Hover a column to see its tooltip.' });
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  // feature() before initialization completes would fail.
  await chart.initializing;
  chart.feature('tooltip', true);

  await chart.animate({
    data: musicData,
    config: {
      channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] } },
    },
  });

  stage.story(chart, [
    {
      say: stage.preview ? 'Tooltips are on: hover a column in the full view' : 'Tooltips are on',
      run: (c) => c.animate({ config: { channels: { y: { set: ['Popularity'] }, color: { set: null } } } }),
    },
    {
      say: stage.preview ? 'Tooltips are on: hover a column in the full view' : 'Stacked again',
      run: (c) =>
        c.animate({
          config: { channels: { y: { set: ['Popularity', 'Kinds'] }, color: { set: ['Kinds'] } } },
        }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
