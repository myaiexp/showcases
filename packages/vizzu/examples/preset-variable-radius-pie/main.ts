// Vizzu example: Vizzu.presets.variableRadiusPie, morphing in from a cartesian relative
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
    config: Vizzu.presets.mekko({
      x: 'Population',
      groupedBy: 'Country',
      y: 'Income',
      stackedBy: [],
      title: 'Income by country, wide = population',
    }),
  });

  stage.story(chart, [
    {
      say: 'variableRadiusPie: each column becomes a slice as wide as its population and as long as its income',
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) =>
        c.animate(
          Vizzu.presets.variableRadiusPie({
            angle: 'Population',
            by: 'Country',
            radius: 'Income',
            title: 'Income by country, wide = population',
          }),
        ),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
