// Vizzu example: Vizzu.presets.bar, morphing in from column
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
    config: Vizzu.presets.column({ x: 'Genres', y: 'Popularity', title: 'Popularity by genre' }),
  });

  stage.story(chart, [
    {
      say: "bar: Popularity runs along x, the genres line up down y",
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) => c.animate(Vizzu.presets.bar({ x: 'Popularity', y: 'Genres', title: 'Popularity by genre' })),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
