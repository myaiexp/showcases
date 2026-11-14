// GreasedLine spiral: tapering widths, a colour table and animated dashes
import {
  ArcRotateCamera,
  Color3,
  CreateGreasedLine,
  GreasedLineMeshColorDistribution,
  GreasedLineMeshWidthDistribution,
  HemisphericLight,
  RawTexture,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 9, new Vector3(0, 1.5, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  // Points as a flat number[]: x, y, z, x, y, z … Short segments avoid perspective distortion.
  const points: number[] = [];
  for (let i = 0; i <= 240; i++) {
    const t = i / 240;
    points.push(Math.cos(t * Math.PI * 8) * (3 - t * 2), t * 4, Math.sin(t * Math.PI * 8) * (3 - t * 2));
  }

  // Width multipliers, two per point, given only for the first 40 points (a thin start
  // swelling to full width); WIDTH_DISTRIBUTION_START fills the rest of the table with 1.
  const widths = Array.from({ length: 40 }, (_, i) => [0.1 + i / 40, 0.1 + i / 40]).flat();
  const colors = [new Color3(1, 0.3, 0.3), new Color3(1, 0.8, 0.2), new Color3(0.3, 0.9, 0.5), new Color3(0.3, 0.6, 1)];

  const line = CreateGreasedLine(
    'spiral',
    { points, widths, widthDistribution: GreasedLineMeshWidthDistribution.WIDTH_DISTRIBUTION_START },
    {
      width: 0.25,
      colors,
      useColors: true,
      // EVEN spreads the four colours over the whole line; LINEAR sampling blends them.
      colorDistribution: GreasedLineMeshColorDistribution.COLOR_DISTRIBUTION_EVEN,
      colorsSampling: RawTexture.LINEAR_LINEAR,
      useDash: true,
      dashCount: 24,
      dashRatio: 0.6,
    },
    scene,
  );
  const material = line.greasedLineMaterial!;

  let dashSpeed = 0.1;
  let drawOn = true;
  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('useDash', true, (on) => (material.useDash = on));
    panel.slider('dashRatio', 0.05, 1, 0.05, 0.6, (v) => (material.dashRatio = v));
    panel.slider('dash speed', -0.5, 0.5, 0.01, dashSpeed, (v) => (dashSpeed = v));
    panel.row();
    panel.slider('width', 0.02, 0.8, 0.01, 0.25, (v) => (material.width = v));
    panel.check('sizeAttenuation', false, (on) => (material.sizeAttenuation = on));
    panel.check('animate visibility', drawOn, (on) => {
      drawOn = on;
      if (!on) material.visibility = 1;
    });
  }

  let t = 0;
  stage.run(() => {
    const dt = scene.getEngine().getDeltaTime() / 1000;
    t += dt;
    // dashOffset scrolls the dashes; visibility draws the line on from 0 to 1.
    material.dashOffset = (material.dashOffset + dashSpeed * dt) % 1;
    if (drawOn) material.visibility = Math.min(1, (t % 6) / 4);
    if (ctx.preview) camera.alpha += 0.004;
  });

  return () => {
    // dispose() leaves the line's material alive unless told otherwise.
    line.dispose(false, true);
    stage.dispose();
  };
};

export default mount;
