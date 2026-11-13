// Two identical LoD objects sharing one budget, biased apart with per-mesh lodScale
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, slider } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    position: [0, 0, ctx.preview ? 4.6 : 3.6],
    orbit: false,
    spark: { lodSplatCount: ctx.preview ? 6000 : 16000 },
  });
  const make = (x: number, lodScale: number): SplatMesh => {
    const knot = new SplatMesh({
      constructSplats: (splats) => pushTorusKnot(splats, ctx.preview ? 20000 : 60000),
      lodScale,
    });
    // Procedural splats get their LoD tree on request (lod: true is for decoded files).
    knot.initialized.then(() => knot.createLodSplats());
    knot.position.x = x;
    stage.scene.add(knot);
    return knot;
  };
  const left = make(-1.15, 0.3);
  const right = make(1.15, 3);
  const label = overlay(el);

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'left lodScale', 0.1, 4, 0.1, left.lodScale, (v) => (left.lodScale = v));
    slider(bar, 'right lodScale', 0.1, 4, 0.1, right.lodScale, (v) => (right.lodScale = v));
  }

  stage.run((time) => {
    left.rotation.y = right.rotation.y = time * 0.3;
    // In a card, swap which knot gets the detail every few seconds.
    if (ctx.preview) {
      const flip = Math.floor(time / 3) % 2 === 0;
      left.lodScale = flip ? 0.3 : 3;
      right.lodScale = flip ? 3 : 0.3;
    }
    label.textContent = `lodScale ${left.lodScale.toFixed(1)}        lodScale ${right.lodScale.toFixed(1)}`;
  });
  return () => stage.dispose();
};

export default mount;
