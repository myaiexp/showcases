// Vizzu example: swapping the order of two dimensions on x changes the grouping
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate({
    data: musicData,
    config: { title: 'Grouped by Genres, then Kinds', channels: { y: { set: ['Popularity'] }, x: { set: ['Genres', 'Kinds'] }, color: { set: ['Kinds'] } } },
  });

  stage.story(chart, [
    {
      say: "x: set [Kinds, Genres]",
      run: (c) => c.animate({ config: { title: 'Regrouping the chart', channels: { x: { set: ['Kinds', 'Genres'] } } } }),
      hold: 2600,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
