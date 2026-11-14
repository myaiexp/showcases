// VFX-JS: ParticleEffect, GPU particles that follow the pointer over a portrait
import { VFX } from '@vfx-js/core';
import { ParticleEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { paramSliders } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { standInPointer } from '../../shared/pointer.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the picture.' });
  const img = await picture('portrait', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // Particles are born where the picture is opaque, near the pointer (birthRate) and,
  // with spawnOnIdle, even while it rests. count defaults to a million: far more than a
  // gallery needs.
  const particles = new ParticleEffect({
    count: ctx.preview ? 40000 : 200000,
    birthRate: ctx.preview ? 6000 : 20000,
    screenBirthRate: ctx.preview ? 2000 : 6000,
    radius: ctx.preview ? 70 : 140,
    pointSize: ctx.preview ? 5 : 8,
    srcOpacity: 0.4,
  });
  await vfx.add(img, { effect: particles });
  // Cards have no pointer; this one drives a figure-eight until the reader's pointer arrives.
  standInPointer(stage, img);

  if (stage.bar) {
    // params is read-only: setParam validates what it is given (count, for one).
    const p = particles.params;
    paramSliders(
      stage.bar,
      { ...p },
      [
        ['birthRate', 0, 60000, 500],
        ['life', 0.2, 4, 0.1],
        ['pointSize', 1, 24, 1],
        ['emitSpeed', 0, 3, 0.1],
        ['noiseSpeed', 0, 1.5, 0.05],
        ['srcOpacity', 0, 1, 0.05],
        ['trailFade', 0, 0.98, 0.01],
      ],
      (k, v) => particles.setParam({ [k]: v }),
    );
    checkbox(stage.bar, 'spawnOnIdle', p.spawnOnIdle, (v) => particles.setParam({ spawnOnIdle: v }));
    stage.say('Particles burst out from the pointer, then drift on a curl-noise field and fade.');
  } else {
    stage.say('a stand-in pointer emits particles');
  }
  return () => stage.dispose();
};

export default mount;
