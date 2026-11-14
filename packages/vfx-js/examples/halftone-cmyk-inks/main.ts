// VFX-JS: HalftoneEffect in CMYK mode with the ink presets, on a paper backdrop
import { VFX } from '@vfx-js/core';
import { HalftoneEffect, type HalftoneInkPresetName } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const INKS: HalftoneInkPresetName[] = ['pure', 'newsprint', 'fogra51', 'swop'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('poster', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // CMYK is subtractive: four inks (cyan, magenta, yellow, black) at their own screen
  // angles, over a paper-coloured background.
  const halftone = new HalftoneEffect({
    mode: 'cmyk',
    gridSize: ctx.preview ? 5 : 9,
    background: [0.97, 0.95, 0.88, 1],
  });
  await vfx.add(img, { effect: halftone });

  const ink = (name: HalftoneInkPresetName): void => {
    halftone.setInkPreset(name);
    stage.say(`setInkPreset("${name}")`);
  };
  if (stage.bar) {
    select(stage.bar, 'ink preset', INKS.map((n) => [n, n] as const), ink, 'newsprint');
    slider(stage.bar, 'blackAmount', 0, 1, 0.01, halftone.params.blackAmount, (v) => (halftone.params.blackAmount = v));
    slider(stage.bar, 'gridSize', 3, 30, 1, halftone.params.gridSize, (v) => (halftone.params.gridSize = v));
    ink('newsprint');
  } else {
    stage.cycle(INKS, 2000, ink);
  }
  return () => stage.dispose();
};

export default mount;
