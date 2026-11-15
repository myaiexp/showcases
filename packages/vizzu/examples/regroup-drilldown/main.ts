// Vizzu example: regroupStrategy: 'drilldown' on an animation that swaps one dimension for another
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
      title: 'Changing dimensions',
      channels: {
        y: { set: ['Popularity'] },
        x: { set: ['Genres'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: 'x: Genres out, Kinds in, regroupStrategy drilldown',
      run: (c) =>
        c.animate(
          {
            config: {
              title: 'Changing dimensions by drilling down',
              channels: { x: { detach: ['Genres'], attach: ['Kinds'] } },
            },
          },
          { regroupStrategy: 'drilldown' },
        ),
      hold: 3000,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
