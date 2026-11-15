// Vizzu example: Vizzu.presets.violin, morphing in from a cartesian relative
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { salesData } from '../../shared/sample-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate({
    data: salesData,
    config: Vizzu.presets.splittedColumn({ x: 'Year', y: 'Revenue', splittedBy: 'Region', title: 'Revenue by year, split by region' }),
  });

  stage.story(chart, [
    {
      say: "violin: each region gets its own area, centred on its own line",
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) => c.animate(Vizzu.presets.violin({ x: 'Year', y: 'Revenue', splittedBy: 'Region', title: 'Revenue by year, as violins' })),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
