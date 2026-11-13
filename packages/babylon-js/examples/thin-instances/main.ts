// Thin instances: one box drawn 400 times from a matrix buffer, with a per-instance colour
import { ArcRotateCamera, Color3, HemisphericLight, Matrix, MeshBuilder, Quaternion, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Identity rotation, shared by every instance matrix.
const NO_ROTATION = Quaternion.Identity();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const side = ctx.preview ? 14 : 22;
  const count = side * side;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 3.2, side * 1.1, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, -0.5), scene);

  const box = MeshBuilder.CreateBox('box', { size: 0.6 }, scene);
  box.material = new StandardMaterial('material', scene);
  // A bounding box fixed to the starting layout would cull the grid when it moves, so skip culling.
  box.alwaysSelectAsActiveMesh = true;

  // Pre-built buffers: 16 floats per matrix, 4 floats (rgba) per colour.
  const matrices = new Float32Array(16 * count);
  const colors = new Float32Array(4 * count);
  for (let i = 0; i < count; i++) {
    const c = Color3.FromHSV((i / count) * 300, 0.7, 1);
    colors.set([c.r, c.g, c.b, 1], i * 4);
  }
  const update = (t: number) => {
    for (let i = 0; i < count; i++) {
      const x = (i % side) - (side - 1) / 2;
      const z = Math.floor(i / side) - (side - 1) / 2;
      const height = 1.2 + Math.sin(Math.hypot(x, z) * 0.7 - t) * 0.9;
      // scale y by `height`, then lift so every box stands on y = 0
      Matrix.Compose(new Vector3(1, height, 1), NO_ROTATION, new Vector3(x, height * 0.3, z)).copyToArray(matrices, i * 16);
    }
  };
  update(0);
  // static = false on the matrix buffer: we will rewrite it every frame.
  box.thinInstanceSetBuffer('matrix', matrices, 16, false);
  box.thinInstanceSetBuffer('color', colors, 4, true);
  box.thinInstanceRefreshBoundingInfo(true);

  stage.run(() => {
    update(performance.now() / 500);
    box.thinInstanceBufferUpdated('matrix');
    if (ctx.preview) camera.alpha += 0.004;
  });

  return () => stage.dispose();
};

export default mount;
