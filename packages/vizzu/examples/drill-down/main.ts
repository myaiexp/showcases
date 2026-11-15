// Vizzu example: attach a dimension to a channel that already holds one to drill down
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  // The tutorial's setup_c state, written out in full (plus whatever this step starts from).
  await chart.animate({
    data: musicData,
    config: {
      title: 'Drill-down',
      channels: {
        y: { set: ['Popularity'] },
        x: { set: ['Genres'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: 'y: attach Kinds, colour: Kinds',
      run: (c) =>
        c.animate({
          config: {
            channels: { y: { attach: ['Kinds'] }, color: { set: ['Kinds'] } },
          },
        }),
      hold: 2800,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
