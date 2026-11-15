// Vizzu example: Vizzu.presets.bubble, morphing in from a cartesian relative
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
    config: Vizzu.presets.column({ x: 'Country', y: 'Population', title: 'Population by country' }),
  });

  stage.story(chart, [
    {
      say: "bubble: the columns become circles packed together, sized by population",
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) => c.animate(Vizzu.presets.bubble({ size: 'Population', color: 'Country', title: 'Population by country, as bubbles' })),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
