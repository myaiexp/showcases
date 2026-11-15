// Vizzu example: chart.constructor.presets gives the same presets as Vizzu.presets
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { countryData } from '../../shared/b2-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  // chart.constructor is typed as plain Function, so the cast to the class gives it its static `presets`.
  const viaConstructor = (chart.constructor as typeof Vizzu).presets;
  const args = { angle: 'Income', radius: 'Country', title: 'Built through chart.constructor.presets' };
  // `presets` is a getter that builds a new Presets object on every read, so === is false.
  // What the docs mean by "equivalent" is that the same call returns the same config.
  const sameObject = viaConstructor === Vizzu.presets;
  const sameConfig =
    JSON.stringify(viaConstructor.radialBar(args)) === JSON.stringify(Vizzu.presets.radialBar(args));

  const side = stage.side();
  if (side) {
    side.textContent = [
      'chart.constructor === Vizzu',
      `  ${chart.constructor === Vizzu}`,
      '',
      'chart.constructor.presets === Vizzu.presets',
      `  ${sameObject}  (each read builds a new object)`,
      '',
      'radialBar(args) from both, as JSON, equal?',
      `  ${sameConfig}`,
    ].join('\n');
  }

  await chart.animate({
    data: countryData,
    config: Vizzu.presets.bar({ x: 'Income', y: 'Country', title: 'Income by country' }),
  });

  stage.story(chart, [
    {
      say: `radialBar built through chart.constructor.presets: same config as Vizzu.presets (${sameConfig}), not the same object (${sameObject})`,
      run: (c) => c.animate(viaConstructor.radialBar(args)),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
