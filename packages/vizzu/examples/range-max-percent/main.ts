// Vizzu example: range.max: '150%' on a measure axis
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
      title: 'Axis range as set by default',
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
      say: 'y: range max 150%',
      run: (c) =>
        c.animate({
          config: {
            title: 'Axis range set proportionally to shown values',
            channels: { y: { range: { max: '150%' } } },
          },
        }),
      hold: 2600,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
