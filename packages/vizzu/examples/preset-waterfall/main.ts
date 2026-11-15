// Vizzu example: Vizzu.presets.waterfall, morphing in from column
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { cashFlowData } from '../../shared/sample-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate({
    data: cashFlowData,
    config: Vizzu.presets.column({ x: 'Month', y: 'Change', title: 'Monthly change' }),
  });

  stage.story(chart, [
    {
      say: 'waterfall: each month starts where the previous one ended',
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) => c.animate(Vizzu.presets.waterfall({ x: 'Month', y: 'Change', title: 'Running balance' })),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
