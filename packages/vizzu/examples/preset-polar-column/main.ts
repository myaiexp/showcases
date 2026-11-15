// Vizzu example: Vizzu.presets.polarColumn, morphing in from a cartesian relative
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { countryData } from '../../shared/b2-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate({
    data: countryData,
    config: Vizzu.presets.column({ x: 'Country', y: 'Income', title: 'Income by country' }),
  });

  stage.story(chart, [
    {
      say: "polarColumn: the columns become spokes, income as the radius",
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) => c.animate(Vizzu.presets.polarColumn({ angle: 'Country', radius: 'Income', title: 'Income by country, polar' })),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
