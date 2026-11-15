// Vizzu example: channels set with {name} descriptors, which can carry an aggregator
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
      channels: {
        y: { set: [{ name: 'Popularity' }] },
        x: { set: [{ name: 'Genres' }] },
      },
    },
  });

  stage.story(chart, [
    {
      say: 'Kinds on x, Popularity summed (the default aggregator)',
      run: (c) =>
        c.animate({
          config: { channels: { x: { set: [{ name: 'Kinds' }] }, y: { set: [{ name: 'Popularity', aggregator: 'sum' }] } } },
        }),
    },
    {
      say: "aggregator: 'mean' averages the records in each column",
      run: (c) =>
        c.animate({ config: { channels: { y: { set: [{ name: 'Popularity', aggregator: 'mean' }] } } } }),
    },
    {
      say: "aggregator: 'max' keeps the largest",
      run: (c) =>
        c.animate({ config: { channels: { y: { set: [{ name: 'Popularity', aggregator: 'max' }] } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;

