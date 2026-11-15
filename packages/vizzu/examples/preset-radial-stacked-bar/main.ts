// Vizzu example: Vizzu.presets.radialStackedBar, morphing in from a cartesian relative
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
    config: Vizzu.presets.stackedBar({ x: 'Sales', stackedBy: 'Channel', y: 'Region', title: 'Sales by region and channel' }),
  });

  stage.story(chart, [
    {
      say: "radialStackedBar: each stacked bar becomes a ring, split into its channels",
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) => c.animate(Vizzu.presets.radialStackedBar({ angle: 'Sales', stackedBy: 'Channel', radius: 'Region', title: 'Sales by region and channel, radial' })),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
