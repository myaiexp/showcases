// Vizzu example: Vizzu.presets.nestedDonut, morphing in from a cartesian relative
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
    config: Vizzu.presets.percentageBar({
      x: 'Sales',
      stackedBy: 'Channel',
      y: 'Region',
      title: 'Channel shares by region',
    }),
  });

  stage.story(chart, [
    {
      say: 'nestedDonut: each region becomes its own ring, every ring filled round to the full circle',
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) =>
        c.animate(
          Vizzu.presets.nestedDonut({
            angle: 'Sales',
            stackedBy: 'Channel',
            radius: 'Region',
            title: 'Channel shares by region, nested',
          }),
        ),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
