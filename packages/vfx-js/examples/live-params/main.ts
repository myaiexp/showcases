// VFX-JS: live params, writing params directly versus setParams
import { VFX } from '@vfx-js/core';
import { ChromaticEffect, type ChromaticParams } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { paramSliders } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const PRESETS: [string, Partial<ChromaticParams>][] = [
  ['subtle', { intensity: 0.1, radius: 0, power: 2 }],
  ['strong', { intensity: 0.6, radius: 0, power: 1 }],
  ['edges only', { intensity: 0.8, radius: 0.6, power: 3 }],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('testcard', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // The effect is added once and never re-added. It reads `params` on every frame, so
  // both ways of changing it show up on the next frame: assigning a field, or setParams
  // with a partial object.
  const chromatic = new ChromaticEffect(PRESETS[0]![1]);
  await vfx.add(img, { effect: chromatic });

  const describe = (): string => {
    const p = chromatic.params;
    return `intensity ${p.intensity.toFixed(2)}, radius ${p.radius.toFixed(2)}, power ${p.power.toFixed(1)}`;
  };
  if (stage.bar) {
    // Assigning one field at a time:
    paramSliders(stage.bar, chromatic.params, [
      ['intensity', 0, 1, 0.01],
      ['radius', 0, 1.5, 0.01],
      ['power', 0.5, 5, 0.1],
    ], (k, v) => {
      chromatic.params[k] = v;
      stage.say(`params.${k} = ${v}: ${describe()}`);
    });
    // Several fields in one call:
    for (const [name, values] of PRESETS) {
      button(stage.bar, name, () => {
        chromatic.setParams(values);
        stage.say(`setParams(${JSON.stringify(values)})`);
      });
    }
    stage.say('Drag a slider, or press a preset: neither re-creates the effect.');
  } else {
    stage.cycle(PRESETS, 2200, ([name, values]) => {
      chromatic.setParams(values);
      stage.say(`setParams "${name}": ${describe()}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
