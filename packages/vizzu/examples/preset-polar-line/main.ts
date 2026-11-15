// Vizzu example: Vizzu.presets.polarLine, morphing in from a cartesian relative
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
    config: Vizzu.presets.line({ x: 'Year', y: 'Revenue', dividedBy: 'Region', title: 'Revenue by year' }),
  });

  stage.story(chart, [
    {
      say: "polarLine: the lines bend around the centre, the years now an angle",
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) => c.animate(Vizzu.presets.polarLine({ angle: 'Year', radius: 'Revenue', dividedBy: 'Region', title: 'Revenue by year, polar' })),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
