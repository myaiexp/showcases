// maxStdDev: how far out each Gaussian is drawn, swept live on a torus knot
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, overlay } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const LOW = Math.sqrt(4);
const HIGH = Math.sqrt(9);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.3, 3.2], spark: { maxStdDev: Math.sqrt(8) } });
  const knot = new SplatMesh({
    constructSplats: (splats) => pushTorusKnot(splats, ctx.preview ? 8000 : 16000),
  });
  knot.scale.setScalar(1.3);
  stage.scene.add(knot);
  const label = overlay(el);

  let auto = true;
  if (!ctx.preview) {
    const bar = controlBar(el);
    const input = slider(bar, 'maxStdDev', 1, HIGH, 0.01, stage.spark.maxStdDev, (v) => {
      auto = false;
      stage.spark.maxStdDev = v;
    });
    input.title = 'The docs call sqrt(4)..sqrt(9) acceptable; below that the Gaussians visibly shrink';
  }

  stage.run((time) => {
    // Until the reader touches the slider, sweep through the documented range.
    if (auto) stage.spark.maxStdDev = LOW + ((Math.sin(time * 0.6) + 1) / 2) * (HIGH - LOW);
    label.textContent = `maxStdDev ${stage.spark.maxStdDev.toFixed(2)}`;
  });
  return () => stage.dispose();
};

export default mount;
