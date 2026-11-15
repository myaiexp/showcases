// Vizzu example: Vizzu.presets.splittedColumn, morphing in from stackedColumn
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
      say: "splittedColumn: the same pieces, each kind pulled out to its own row of columns",
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) => c.animate(Vizzu.presets.splittedColumn({ x: 'Genres', y: 'Popularity', splittedBy: 'Kinds', title: 'Genres, split by kind' })),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
