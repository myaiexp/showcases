// the four ctx.draw blend modes on the same two layers
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';
import { BlendEffect } from './blend-effect.ts';

const MODES = ['none', 'normal', 'premultiplied', 'additive'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  const width = ctx.preview ? 46 : 100;
  for (const mode of MODES) {
    const cell = document.createElement('figure');
    cell.style.cssText = 'margin:0;display:flex;flex-direction:column;align-items:center;gap:4px';
    const img = await picture('flowers', width);
    const label = document.createElement('figcaption');
    label.textContent = mode;
    label.style.cssText = `font:${ctx.preview ? 8 : 12}px monospace;color:#aaa`;
    cell.append(img, label);
    stage.root.append(cell);
    // One effect instance per element: each has its own mode.
    await vfx.add(img, { effect: new BlendEffect(mode) });
  }
  stage.say('Each picture draws the same stripes, then the same alpha-0.5 layer over them; only the blend option differs.');
  return () => stage.dispose();
};

export default mount;
