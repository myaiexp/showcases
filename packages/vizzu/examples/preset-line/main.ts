// Vizzu example: Vizzu.presets.line, morphing in from a cartesian relative
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
    config: Vizzu.presets.area({ x: 'Year', y: 'Revenue', title: 'Total revenue by year' }),
  });

  stage.story(chart, [
    {
      say: 'line: the single area becomes one line per region',
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) =>
        c.animate(
          Vizzu.presets.line({
            x: 'Year',
            y: 'Revenue',
            dividedBy: 'Region',
            title: 'Revenue by year, one line per region',
          }),
        ),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
