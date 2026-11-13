// PointsCloudSystem: points sampled on a mesh's surface and inside its volume
import {
  ArcRotateCamera,
  Color4,
  MeshBuilder,
  PointColor,
  PointsCloudSystem,
  Vector3,
  type Mesh,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  scene.clearColor = new Color4(0.03, 0.03, 0.06, 1);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 9, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);

  const count = ctx.preview ? 8000 : 30000;
  let pcs: PointsCloudSystem | undefined;
  let cloud: Mesh | undefined;

  const build = async (mode: 'surface' | 'volume', coloring: 'Random' | 'Stated'): Promise<void> => {
    pcs?.dispose();
    // Models to sample: a torus knot on the left, a box on the right.
    const knot = MeshBuilder.CreateTorusKnot('knot', { radius: 1, tube: 0.35, radialSegments: 96 }, scene);
    knot.position.x = -1.8;
    const box = MeshBuilder.CreateBox('box', { size: 2 }, scene);
    box.position.x = 1.8;
    box.rotation.set(0.5, 0.6, 0);

    pcs = new PointsCloudSystem('pcs', 2, scene);
    for (const [model, color] of [[knot, new Color4(1, 0.5, 0.2, 1)], [box, new Color4(0.3, 0.7, 1, 1)]] as const) {
      // Stated: a base colour randomized by a range (the typings want a Color4); Random: any colour.
      if (mode === 'surface') {
        if (coloring === 'Stated') pcs.addSurfacePoints(model, count / 2, PointColor.Stated, color, 0.3);
        else pcs.addSurfacePoints(model, count / 2, PointColor.Random);
      } else if (coloring === 'Stated') pcs.addVolumePoints(model, count / 2, PointColor.Stated, color, 0.3);
      else pcs.addVolumePoints(model, count / 2, PointColor.Random);
    }
    // The models must outlive the build; once the cloud exists they can go.
    cloud = await pcs.buildMeshAsync();
    knot.dispose();
    box.dispose();
  };
  await build('surface', 'Stated');

  if (!ctx.preview) {
    const panel = createPanel(el);
    const state = { mode: 'surface' as 'surface' | 'volume', coloring: 'Stated' as 'Random' | 'Stated' };
    panel.select('points', ['surface', 'volume'] as const, 'surface', (v) => void build((state.mode = v), state.coloring));
    panel.select('PointColor', ['Stated', 'Random'] as const, 'Stated', (v) => void build(state.mode, (state.coloring = v)));
    panel.slider('pointSize', 1, 6, 1, 2, (v) => cloud?.material && (cloud.material.pointSize = v));
  }

  stage.run(() => {
    if (cloud) cloud.rotation.y += 0.004;
  });
  return () => {
    pcs?.dispose();
    stage.dispose();
  };
};

export default mount;
