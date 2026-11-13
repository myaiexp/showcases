// focalDistance and apertureAngle: five balls at different depths
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, overlay } from '../../shared/controls.ts';
import { pushBlobShell, pingPong } from '../../renderer-kit/scenes.ts';

const DEPTHS = [3, 4.5, 6, 7.5, 9];
const ANGLES = [-0.42, -0.21, 0, 0.21, 0.42];

const mount: Mount = (el, ctx) => {
  // Depth of field only runs when both focalDistance and apertureAngle are above 0.
  const stage = createStage(el, ctx, {
    position: [0, 0, 0],
    target: [0, 0, -1],
    orbit: false,
    spark: { focalDistance: 3, apertureAngle: 0.06 },
  });
  // Balls fan out along the view at depths 3 to 9 units. Each is scaled with its depth so all
  // look the same size on screen, and only blur tells how far off the focal plane they are.
  DEPTHS.forEach((d, i) => {
    const k = d / 3;
    const ball = new SplatMesh({
      constructSplats: (s) =>
        pushBlobShell(s, { count: ctx.preview ? 500 : 900, radius: 0.3 * k, scale: 0.03 * k, hue: i / DEPTHS.length }),
    });
    ball.position.set(Math.sin(ANGLES[i]!) * d, (i % 2 === 0 ? -0.1 : 0.1) * d, -Math.cos(ANGLES[i]!) * d);
    stage.scene.add(ball);
  });
  const label = overlay(el);

  let auto = true;
  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'focalDistance', 0.5, 10, 0.05, 3, (v) => {
      auto = false;
      stage.spark.focalDistance = v;
    });
    slider(bar, 'apertureAngle', 0, 0.15, 0.005, 0.06, (v) => (stage.spark.apertureAngle = v));
  }

  stage.run((time) => {
    // Rack focus from the nearest ball (3 units away) to the farthest (9).
    if (auto) stage.spark.focalDistance = 3 + pingPong(time, 7) * 6;
    label.textContent = ctx.preview
      ? `focalDistance ${stage.spark.focalDistance.toFixed(1)}`
      : `focalDistance ${stage.spark.focalDistance.toFixed(1)}  apertureAngle ${stage.spark.apertureAngle.toFixed(3)}`;
  });
  return () => stage.dispose();
};

export default mount;
