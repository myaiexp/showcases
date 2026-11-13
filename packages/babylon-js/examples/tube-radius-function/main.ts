// CreateTube along a curve, with a radiusFunction that swells and pinches the radius
import { ArcRotateCamera, Color3, HemisphericLight, Mesh, MeshBuilder, PointLight, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new ArcRotateCamera('camera', -Math.PI / 2.4, Math.PI / 2.5, 12, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('fill', new Vector3(0, 1, 0), scene).intensity = 0.5;
  new PointLight('key', new Vector3(-5, 6, -8), scene);

  // The path: a helix of Vector3 points.
  const path: Vector3[] = [];
  for (let i = 0; i <= 120; i++) {
    const a = i * 0.12;
    path.push(new Vector3(Math.cos(a) * 2.2, i * 0.05 - 3, Math.sin(a) * 2.2));
  }

  // radiusFunction(index, distance) returns the radius at each path point.
  const tube = MeshBuilder.CreateTube(
    'tube',
    {
      path,
      radiusFunction: (index) => 0.25 + 0.2 * Math.sin(index * 0.35),
      tessellation: ctx.preview ? 12 : 32,
      cap: Mesh.CAP_ALL,
      sideOrientation: Mesh.DOUBLESIDE,
    },
    scene,
  );
  const material = new StandardMaterial('material', scene);
  material.diffuseColor = new Color3(0.9, 0.35, 0.45);
  material.specularPower = 48;
  tube.material = material;

  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.006;
    else tube.rotation.y += 0.004;
  });

  return () => stage.dispose();
};

export default mount;
