// Vizzu example: Vizzu.presets.percentageColumn, morphing in from stackedColumn
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
    config: Vizzu.presets.stackedColumn({ x: 'Genres', y: 'Popularity', stackedBy: 'Kinds', title: 'Genres, stacked by kind' }),
  });

  stage.story(chart, [
    {
      say: "percentageColumn: every column stretched to full height, so the pieces show shares",
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) => c.animate(Vizzu.presets.percentageColumn({ x: 'Genres', y: 'Popularity', stackedBy: 'Kinds', title: 'Share of each kind' })),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
