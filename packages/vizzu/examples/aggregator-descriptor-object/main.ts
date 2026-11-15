// Vizzu example: series descriptor objects instead of aggregator names in strings
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
    config: {
      title: 'Sum of Popularity by Genres',
      channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } },
    },
  });

  stage.story(chart, [
    {
      say: "{ name: 'Popularity', aggregator: 'max' }",
      run: (c) =>
        c.animate({
          config: {
            title: 'Maximum of Popularity by Genres',
            channels: { y: { set: [{ name: 'Popularity', aggregator: 'max' }] } },
          },
        }),
    },
    {
      say: "{ name: 'Popularity', aggregator: 'mean' }",
      run: (c) =>
        c.animate({
          config: {
            title: 'Mean of Popularity by Genres',
            channels: { y: { set: [{ name: 'Popularity', aggregator: 'mean' }] } },
          },
        }),
    },
    {
      say: "{ name: 'Kinds', aggregator: 'distinct' }",
      run: (c) =>
        c.animate({
          config: {
            title: 'Distinct Kinds by Genres',
            channels: { y: { set: [{ name: 'Kinds', aggregator: 'distinct' }] } },
          },
        }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
