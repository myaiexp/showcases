// PatternRefractionEffect patterns (lenticular, waves, circular), edges, centre
import { VFX } from '@vfx-js/core';
import { PatternRefractionEffect, type RefractionEdgeWrap, type RefractionPattern } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { paramSliders } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const PATTERNS: RefractionPattern[] = ['lenticular', 'waves', 'circular'];
const WRAPS: RefractionEdgeWrap[] = ['zero', 'clamp', 'repeat', 'mirror'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('city', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const glass = new PatternRefractionEffect({ pattern: 'circular', strength: 0.8, stripWidth: 0.12, edgeWrap: 'mirror' });
  await vfx.add(img, { effect: glass });

  const p = glass.params;
  const show = (): void => stage.say(`pattern "${p.pattern}", edgeWrap "${p.edgeWrap}"`);
  if (stage.bar) {
    select(stage.bar, 'pattern', PATTERNS.map((v) => [v, v] as const), (v) => ((p.pattern = v), show()), p.pattern);
    select(stage.bar, 'edgeWrap', WRAPS.map((v) => [v, v] as const), (v) => ((p.edgeWrap = v), show()), p.edgeWrap);
    paramSliders(stage.bar, p, [
      ['centerX', 0, 1, 0.01],
      ['centerY', 0, 1, 0.01],
      ['stripWidth', 0.03, 0.5, 0.01],
    ]);
    show();
  } else {
    stage.cycle(PATTERNS, 2500, (v) => {
      p.pattern = v;
      show();
    });
  }
  return () => stage.dispose();
};

export default mount;
