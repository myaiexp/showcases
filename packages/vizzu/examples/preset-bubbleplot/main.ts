// Vizzu example: Vizzu.presets.bubbleplot, morphing in from scatter
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
    config: Vizzu.presets.scatter({ x: 'Income', y: 'Online', dividedBy: 'Country', title: 'Income against internet use' }),
  });

  stage.story(chart, [
    {
      say: "bubbleplot: the scatter, with a bubble sized by Population and coloured by Continent",
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) => c.animate(Vizzu.presets.bubbleplot({ x: 'Income', y: 'Online', color: 'Continent', size: 'Population', dividedBy: 'Country', title: 'Bubble size is population' })),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
