// CreateLathe turns a 2D profile in the xy plane into a vase by spinning it round the y axis
import { ArcRotateCamera, Color3, HemisphericLight, Mesh, MeshBuilder, PointLight, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.8, 9, new Vector3(0, 1.4, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('fill', new Vector3(0, 1, 0), scene).intensity = 0.5;
  new PointLight('key', new Vector3(-4, 6, -6), scene);

  // The profile: x is the distance from the axis (positive), y the height.
  const shape: Vector3[] = [];
  for (let i = 0; i <= 30; i++) {
    const y = i / 30;
    const x = 0.6 + 0.9 * Math.sin(y * Math.PI * 0.9) ** 2 + (y > 0.85 ? (y - 0.85) * 3 : 0);
    shape.push(new Vector3(x, y * 4, 0));
  }

  const vase = MeshBuilder.CreateLathe(
    'vase',
    { shape, radius: 1, tessellation: ctx.preview ? 24 : 64, sideOrientation: Mesh.DOUBLESIDE },
    scene,
  );
  const material = new StandardMaterial('material', scene);
  material.diffuseColor = new Color3(0.3, 0.7, 0.65);
  material.specularPower = 64;
  vase.material = material;

  // The same profile cut open with `arc` and `closed: false`: a half vase beside it.
  const half = MeshBuilder.CreateLathe(
    'half',
    { shape, arc: 0.5, closed: false, tessellation: 32, sideOrientation: Mesh.DOUBLESIDE },
    scene,
  );
  half.position.x = 3.6;
  half.material = material;

  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.005;
    else half.rotation.y += 0.01;
  });

  return () => stage.dispose();
};

export default mount;
