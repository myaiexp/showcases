// Vizzu example: a dimension added to y and to color stacks the columns
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
      title: 'Creating a stacked chart',
      channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } },
    },
  });

  stage.story(chart, [
    {
      say: 'Kinds attached to y and to color',
      run: (c) =>
        c.animate({ config: { channels: { y: { attach: ['Kinds'] }, color: { attach: ['Kinds'] } } } }),
      hold: 2600,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
