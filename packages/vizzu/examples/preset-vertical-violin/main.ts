// Vizzu example: Vizzu.presets.verticalViolin, morphing in from a cartesian relative
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
    config: Vizzu.presets.splittedBar({ x: 'Revenue', splittedBy: 'Region', y: 'Year', title: 'Revenue by year, split by region' }),
  });

  stage.story(chart, [
    {
      say: "verticalViolin: the bars become areas, each region centred on its own vertical line",
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) => c.animate(Vizzu.presets.verticalViolin({ x: 'Revenue', splittedBy: 'Region', y: 'Year', title: 'Revenue by year, as vertical violins' })),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
