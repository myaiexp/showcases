// Vizzu example: Vizzu.presets.percentageArea, morphing in from stackedArea
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
      say: 'percentageArea: the stacked areas stretched to the full height, so they show shares',
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) =>
        c.animate(
          Vizzu.presets.percentageArea({
            x: 'Year',
            y: 'Revenue',
            stackedBy: 'Region',
            title: 'Share of revenue by region',
          }),
        ),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
