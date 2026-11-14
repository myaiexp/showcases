// SplatMesh.recolor tints and SplatMesh.opacity fades every splat, live
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, controlBar, slider } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0, 2.6] });
  const knot = new SplatMesh({ constructSplats: (splats) => pushTorusKnot(splats, ctx.preview ? 15000 : 30000) });
  stage.scene.add(knot);

  // Until a control is touched, the tint sweeps the hue wheel and the opacity pulses.
  let auto = true;
  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'recolor.r', 0, 2, 0.05, 1, (v) => ((auto = false), (knot.recolor.r = v)));
    slider(bar, 'recolor.g', 0, 2, 0.05, 1, (v) => ((auto = false), (knot.recolor.g = v)));
    slider(bar, 'recolor.b', 0, 2, 0.05, 1, (v) => ((auto = false), (knot.recolor.b = v)));
    slider(bar, 'opacity', 0, 1, 0.05, 1, (v) => ((auto = false), (knot.opacity = v)));
    button(bar, 'Animate again', () => (auto = true));
  }

  stage.run((time) => {
    if (!auto) return;
    knot.recolor.setHSL((time * 0.12) % 1, 0.9, 0.7).multiplyScalar(1.6);
    knot.opacity = 0.65 + 0.35 * Math.sin(time * 1.3);
  });
  return () => stage.dispose();
};

export default mount;
