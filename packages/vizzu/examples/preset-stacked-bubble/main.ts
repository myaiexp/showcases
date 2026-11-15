// Vizzu example: Vizzu.presets.stackedBubble, morphing in from a cartesian relative
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
    config: Vizzu.presets.bubble({ size: 'Popularity', color: 'Kinds', title: 'Popularity by kind' }),
  });

  stage.story(chart, [
    {
      say: 'stackedBubble: each kind of music splits into one bubble per genre',
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) =>
        c.animate(
          Vizzu.presets.stackedBubble({
            size: 'Popularity',
            color: 'Kinds',
            stackedBy: 'Genres',
            title: 'Popularity by kind and genre',
          }),
        ),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
