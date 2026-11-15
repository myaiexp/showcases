// Vizzu example: Vizzu.presets.column, morphing in from bar
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
    config: Vizzu.presets.bar({ x: 'Popularity', y: 'Genres', title: 'Popularity by genre, as bars' }),
  });

  stage.story(chart, [
    {
      say: "column: Genres along x, Popularity up y, the value on each column",
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) => c.animate(Vizzu.presets.column({ x: 'Genres', y: 'Popularity', title: 'Popularity by genre' })),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
