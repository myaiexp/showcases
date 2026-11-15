// Vizzu example: sort: "none" and reverse: false restore the default order
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
      title: 'Descending by value',
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'], sort: 'byValue', reverse: true },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: 'x: sort none, reverse false',
      run: (c) =>
        c.animate({
          config: {
            title: "Let's get back to where we were",
            channels: { x: { sort: 'none', reverse: false } },
          },
        }),
      hold: 2600,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
