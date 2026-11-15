// Vizzu example: Vizzu.presets.groupedBar, morphing in from bar
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
    config: Vizzu.presets.bar({ x: 'Popularity', y: 'Genres', title: 'Popularity by genre' }),
  });

  stage.story(chart, [
    {
      say: "groupedBar: one group of bars per genre, one bar per kind, coloured by kind",
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) => c.animate(Vizzu.presets.groupedBar({ x: 'Popularity', groupedBy: 'Genres', y: 'Kinds', title: 'Each genre by kind' })),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
