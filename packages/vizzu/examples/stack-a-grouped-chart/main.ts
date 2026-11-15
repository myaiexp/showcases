// Vizzu example: moving a dimension from x to y stacks a grouped chart
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
      title: 'Grouped chart',
      channels: { y: { set: ['Popularity'] }, x: { set: ['Genres', 'Kinds'] }, color: { set: ['Kinds'] } },
    },
  });

  stage.story(chart, [
    {
      say: 'Kinds: detach from x, attach to y',
      run: (c) =>
        c.animate({
          config: {
            title: '...doing it the other way is how you stack your chart',
            channels: { x: { detach: ['Kinds'] }, y: { attach: ['Kinds'] } },
          },
        }),
      hold: 2600,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
