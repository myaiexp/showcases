// CreateRibbon from an array of paths, re-shaped every frame through the instance option
import { ArcRotateCamera, Color3, HemisphericLight, Mesh, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const PATHS = 10;
const POINTS = 48;

/** Each path is one "wire" of the ribbon; neighbouring paths are joined into a surface. */
function buildPaths(t: number): Vector3[][] {
  const paths: Vector3[][] = [];
  for (let p = 0; p < PATHS; p++) {
    const z = (p - (PATHS - 1) / 2) * 0.45;
    const path: Vector3[] = [];
    for (let i = 0; i < POINTS; i++) {
      const x = (i - (POINTS - 1) / 2) * 0.17;
      const y = Math.sin(x * 1.6 + t + z * 0.8) * 0.7 + Math.cos(z * 1.2 - t * 0.7) * 0.3;
      path.push(new Vector3(x, y, z));
    }
    paths.push(path);
  }
  return paths;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new ArcRotateCamera('camera', -Math.PI / 2.4, Math.PI / 3, 9, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.2, 1, -0.4), scene);

  // updatable: true lets us pass the mesh back as `instance` with a new pathArray of the same shape.
  let ribbon = MeshBuilder.CreateRibbon(
    'ribbon',
    { pathArray: buildPaths(0), updatable: true, sideOrientation: Mesh.DOUBLESIDE },
    scene,
  );
  const material = new StandardMaterial('material', scene);
  material.diffuseColor = new Color3(0.2, 0.6, 0.9);
  material.specularColor = new Color3(0.4, 0.4, 0.4);
  ribbon.material = material;

  stage.run(() => {
    const t = performance.now() / 700;
    ribbon = MeshBuilder.CreateRibbon('ribbon', { pathArray: buildPaths(t), instance: ribbon });
    if (ctx.preview) camera.alpha += 0.003;
  });

  return () => stage.dispose();
};

export default mount;
