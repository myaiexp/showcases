// the "vignette" preset and its intensity, radius and power uniforms
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('portrait', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // All three uniforms must be passed. radius: where darkening starts (0 is the centre,
  // ~1 the short edge); power: how fast it falls off; intensity: how dark it gets.
  const u = { intensity: 1, radius: 0.4, power: 1.5 };
  await vfx.add(img, {
    shader: 'vignette',
    uniforms: { intensity: () => u.intensity, radius: () => u.radius, power: () => u.power },
  });

  if (stage.bar) {
    slider(stage.bar, 'intensity', 0, 3, 0.05, u.intensity, (v) => (u.intensity = v));
    slider(stage.bar, 'radius', 0, 1.5, 0.01, u.radius, (v) => (u.radius = v));
    slider(stage.bar, 'power', 0.2, 4, 0.05, u.power, (v) => (u.power = v));
  } else {
    stage.frame((t) => {
      u.radius = 0.45 + 0.35 * Math.sin(t * 1.3);
      stage.say(`radius ${u.radius.toFixed(2)}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
