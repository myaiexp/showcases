// Vizzu example: moving a dimension from y to x turns stacked columns into groups
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
      title: '...then you can add it to another channel = group elements',
      channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] } },
    },
  });

  stage.story(chart, [
    {
      say: 'Kinds: detach from y, attach to x',
      run: (c) =>
        c.animate({
          config: { title: 'Grouped', channels: { y: { detach: ['Kinds'] }, x: { attach: ['Kinds'] } } },
        }),
      hold: 2600,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
