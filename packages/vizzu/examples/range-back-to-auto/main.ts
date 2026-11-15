// Vizzu example: range values of 'auto' restore the default ranges
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
      title: "Fixed ranges",
      channels: {
        y: { set: ['Popularity', 'Kinds'], range: { max: '150%' } },
        x: { set: ['Genres'], range: { min: -2, max: 3 } },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: "y max and x min/max: 'auto'",
      run: (c) => c.animate({
        config: {
          title: 'Back to the default ranges',
          channels: {
            y: { range: { max: 'auto' } },
            x: { range: { min: 'auto', max: 'auto' } },
          },
        },
      }),
      hold: 2800,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
