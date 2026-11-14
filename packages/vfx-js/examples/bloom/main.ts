// VFX-JS example: BloomEffect on a night city, its params changed live
import { VFX } from '@vfx-js/core';
import { BloomEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('city', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // One effect instance per element. pad gives the glow room outside the image
  // (effects ignore `overflow`).
  const bloom = new BloomEffect({ threshold: 0.2, intensity: 4, pad: 60 });
  await vfx.add(img, { effect: bloom });

  // Bloom reads its params every frame, so changing them needs no re-add.
  if (stage.bar) {
    const p = bloom.params;
    slider(stage.bar, 'threshold', 0, 1, 0.01, p.threshold, (v) => (p.threshold = v));
    slider(stage.bar, 'softness', 0, 1, 0.01, p.softness, (v) => (p.softness = v));
    slider(stage.bar, 'intensity', 0, 10, 0.1, p.intensity, (v) => (p.intensity = v));
    slider(stage.bar, 'scatter', 0, 1, 0.01, p.scatter, (v) => (p.scatter = v));
  } else {
    stage.frame((t) => {
      bloom.params.intensity = 3 + 3 * Math.sin(t * 1.2);
      stage.say(`intensity ${bloom.params.intensity.toFixed(1)}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
