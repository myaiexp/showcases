// Vizzu example: Vizzu.presets.verticalStream, morphing in from a cartesian relative
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
    config: Vizzu.presets.stackedBar({
      x: 'Revenue',
      stackedBy: 'Region',
      y: 'Year',
      title: 'Revenue by year, stacked',
    }),
  });

  stage.story(chart, [
    {
      say: 'verticalStream: the stacked bars turn into areas, centred on the middle of the x-axis',
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) =>
        c.animate(
          Vizzu.presets.verticalStream({
            x: 'Revenue',
            stackedBy: 'Region',
            y: 'Year',
            title: 'Revenue by year, as a vertical stream',
          }),
        ),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
