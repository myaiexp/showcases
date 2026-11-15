// Vizzu example: Vizzu.presets.stackedTreemap, morphing in from a cartesian relative
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
    config: Vizzu.presets.treemap({ size: 'Sales', color: 'Region', title: 'Sales by region' }),
  });

  stage.story(chart, [
    {
      say: 'stackedTreemap: each region tile is cut into its channels',
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) =>
        c.animate(
          Vizzu.presets.stackedTreemap({
            size: 'Sales',
            dividedBy: 'Region',
            color: 'Channel',
            title: 'Sales by region and channel',
          }),
        ),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
