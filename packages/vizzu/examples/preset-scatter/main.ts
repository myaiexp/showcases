// Vizzu example: Vizzu.presets.scatter, morphing in from column
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
      say: 'scatter: one dot per country, income along x, share online up y',
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) =>
        c.animate(
          Vizzu.presets.scatter({
            x: 'Income',
            y: 'Online',
            dividedBy: 'Country',
            title: 'Income against internet use',
          }),
        ),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
