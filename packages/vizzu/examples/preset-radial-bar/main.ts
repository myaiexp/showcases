// Vizzu example: Vizzu.presets.radialBar, morphing in from a cartesian relative
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
    config: Vizzu.presets.bar({ x: 'Income', y: 'Country', title: 'Income by country' }),
  });

  stage.story(chart, [
    {
      say: "radialBar: the bars curl into arcs around a hole, longer arcs for higher income",
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) => c.animate(Vizzu.presets.radialBar({ angle: 'Income', radius: 'Country', title: 'Income by country, radial' })),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
