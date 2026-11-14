// the "chromatic" preset and its intensity, radius and power uniforms
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('testcard', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // Outside `radius` the red, green and blue channels are scaled by different amounts,
  // so they part towards the edges. All three uniforms must be passed.
  const u = { intensity: 2, radius: 0.2, power: 2 };
  await vfx.add(img, {
    shader: 'chromatic',
    uniforms: { intensity: () => u.intensity, radius: () => u.radius, power: () => u.power },
  });

  if (stage.bar) {
    slider(stage.bar, 'intensity', 0, 10, 0.1, u.intensity, (v) => (u.intensity = v));
    slider(stage.bar, 'radius', 0, 1.5, 0.01, u.radius, (v) => (u.radius = v));
    slider(stage.bar, 'power', 0.2, 4, 0.05, u.power, (v) => (u.power = v));
  } else {
    stage.frame((t) => {
      u.intensity = 2.5 + 2.5 * Math.sin(t * 1.5);
      stage.say(`intensity ${u.intensity.toFixed(1)}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
