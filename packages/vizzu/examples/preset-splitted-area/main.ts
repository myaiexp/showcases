// Vizzu example: Vizzu.presets.splittedArea, morphing in from stackedArea
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
    config: Vizzu.presets.stackedArea({
      x: 'Year',
      y: 'Revenue',
      stackedBy: 'Region',
      title: 'Revenue by region, stacked',
    }),
  });

  stage.story(chart, [
    {
      say: 'splittedArea: the stacked bands pulled apart, one band per region',
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) =>
        c.animate(
          Vizzu.presets.splittedArea({
            x: 'Year',
            y: 'Revenue',
            splittedBy: 'Region',
            title: 'Revenue by region, split',
          }),
        ),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
