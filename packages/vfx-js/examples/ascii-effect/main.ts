// VFX-JS: AsciiEffect turns a portrait into glyphs, grid size live
import { VFX } from '@vfx-js/core';
import { AsciiEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { paramSliders, sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('portrait', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // The glyph atlas is built when the effect is added. grid, colour, invert and dither are
  // read every frame afterwards.
  const ascii = new AsciiEffect({ grid: 10, colorFromSource: true, background: [0, 0, 0, 1] });
  await vfx.add(img, { effect: ascii });

  const p = ascii.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [
      ['grid', 4, 32, 1],
      ['dither', 0, 1, 0.05],
    ]);
    checkbox(stage.bar, 'colorFromSource', p.colorFromSource, (v) => (p.colorFromSource = v));
    checkbox(stage.bar, 'invert', p.invert, (v) => (p.invert = v));
    stage.say('One glyph per grid cell, picked from a dark-to-light ramp by the cell\'s brightness.');
  } else {
    stage.frame((t) => {
      p.grid = Math.round(sweep(t, 7, 16, 8));
      stage.say(`grid ${p.grid}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
