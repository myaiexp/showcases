// VFX-JS: ColoredEdgesEffect draws Sobel edges in two colours
import { VFX } from '@vfx-js/core';
import { ColoredEdgesEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { textInput } from '../../shared/controls.ts';
import { paramSliders, sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('flowers', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // Colours are hex strings here (not vec4 arrays like DuotoneEffect).
  const edges = new ColoredEdgesEffect({ color1: '#ff3d81', color2: '#2de2e6', background: '#0b0b1a', thickness: 2 });
  await vfx.add(img, { effect: edges });

  const p = edges.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [
      ['threshold', 0, 1, 0.01],
      ['thickness', 1, 8, 0.5],
      ['intensity', 0, 10, 0.1],
      ['opacity', 0, 1, 0.01],
    ]);
    const hex = /^#[0-9a-f]{6}$/i;
    textInput(stage.bar, 'color1', p.color1, (v) => hex.test(v) && (p.color1 = v), 8);
    textInput(stage.bar, 'color2', p.color2, (v) => hex.test(v) && (p.color2 = v), 8);
    stage.say('Edges are found with a Sobel kernel and coloured along a gradient from color1 to color2; opacity mixes the picture back in.');
  } else {
    stage.frame((t) => {
      p.threshold = sweep(t, 0.05, 0.4, 6);
      stage.say(`threshold ${p.threshold.toFixed(2)}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
