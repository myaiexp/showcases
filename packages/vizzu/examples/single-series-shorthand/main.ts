// Vizzu example: attach and detach take a series name, not an array, when there is only one
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
      title: 'When just one series is used',
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: "attach: 'Kinds' and detach: 'Kinds', no arrays",
      run: (c) =>
        c.animate({
          channels: {
            // x: { attach: ['Kinds'] },
            x: { attach: 'Kinds' },
            // y: { detach: ['Kinds'] },
            y: { detach: 'Kinds', align: 'none' },
          },
        }),
    },
    {
      say: 'The same on the way back',
      run: (c) =>
        c.animate({
          channels: {
            // x: { detach: ['Kinds'] },
            x: { detach: 'Kinds' },
            // y: { attach: ['Kinds'] },
            y: { attach: 'Kinds' },
          },
        }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
