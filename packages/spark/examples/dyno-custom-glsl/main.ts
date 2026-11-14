// A hand-written GLSL Dyno (globals + statements) used as an object modifier
import { SplatMesh, dyno } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';
import { NoiseFuzz } from './noise.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0, 2.7], orbit: 0.2 });
  const knot = new SplatMesh({ constructSplats: (splats) => pushTorusKnot(splats, ctx.preview ? 15000 : 30000) });
  stage.scene.add(knot);

  const freq = dyno.dynoFloat(3);
  const amount = dyno.dynoFloat(0.25);
  const time = dyno.dynoFloat(0);

  // The custom block is wired in like any stdlib block: its `gsplat` input is the splat so far.
  const fuzz = dyno.dynoBlock({ gsplat: dyno.Gsplat }, { gsplat: dyno.Gsplat }, ({ gsplat }) => {
    if (!gsplat) throw new Error('no gsplat');
    return { gsplat: new NoiseFuzz({ gsplat, freq, amount, time }).outputs.gsplat };
  });
  knot.objectModifiers = [fuzz];
  knot.updateGenerator();

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'noise frequency', 0.5, 8, 0.1, freq.value, (v) => (freq.value = v));
    slider(bar, 'displacement', 0, 0.6, 0.01, amount.value, (v) => (amount.value = v));
  }

  stage.run((t) => {
    time.value = t * 0.6;
    knot.updateVersion();
  });
  return () => stage.dispose();
};

export default mount;
