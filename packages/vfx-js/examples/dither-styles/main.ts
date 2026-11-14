// VFX-JS: DitherEffect styles (Bayer, blue noise, threshold) and mono
import { VFX } from '@vfx-js/core';
import { DitherEffect, type DitherStyle } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { checkbox, select, slider, textInput } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const STYLES: DitherStyle[] = ['bayer2', 'bayer4', 'bayer8', 'bayer16', 'blueNoise', 'threshold'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('portrait', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const dither = new DitherEffect({ style: 'bayer4', size: 4, levels: 2, mono: true, monoColor: '#7CFFB2' });
  await vfx.add(img, { effect: dither });

  const p = dither.params;
  const show = (s: DitherStyle): void => {
    p.style = s;
    stage.say(`style "${s}"${p.mono ? ', one tinted channel' : ''}`);
  };
  if (stage.bar) {
    select(stage.bar, 'style', STYLES.map((s) => [s, s] as const), show, p.style);
    slider(stage.bar, 'size', 1, 12, 1, p.size, (v) => (p.size = v));
    slider(stage.bar, 'levels', 2, 8, 1, p.levels, (v) => (p.levels = v));
    checkbox(stage.bar, 'mono', p.mono, (v) => (p.mono = v));
    textInput(stage.bar, 'monoColor', p.monoColor, (v) => /^#[0-9a-f]{6}$/i.test(v) && (p.monoColor = v), 8);
    show(p.style);
  } else {
    stage.cycle(STYLES, 1800, show);
  }
  return () => stage.dispose();
};

export default mount;
