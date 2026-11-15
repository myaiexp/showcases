// Vizzu example: Vizzu.presets.polarStackedColumn, morphing in from a cartesian relative
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
    config: Vizzu.presets.stackedColumn({ x: 'Region', y: 'Sales', stackedBy: 'Channel', title: 'Sales by region and channel' }),
  });

  stage.story(chart, [
    {
      say: "polarStackedColumn: each stacked column becomes a wedge, the channels stacked outward",
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) => c.animate(Vizzu.presets.polarStackedColumn({ angle: 'Region', radius: 'Sales', stackedBy: 'Channel', title: 'Sales by region and channel, polar' })),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
