// Vizzu example: Vizzu.presets.donut, morphing in from a cartesian relative
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { marketData } from '../../shared/b2-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate({
    data: marketData,
    config: Vizzu.presets.stackedBar({ x: 'Sales', stackedBy: 'Region', y: [], title: 'Sales by region' }),
  });

  stage.story(chart, [
    {
      say: "donut: the stacked bar becomes a ring with a hole",
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) => c.animate(Vizzu.presets.donut({ angle: 'Sales', stackedBy: 'Region', title: 'Sales by region, as a donut' })),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
