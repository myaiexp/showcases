// ExtrudeShape sweeps a star profile along a path, rotating and scaling it at every step
import { ArcRotateCamera, Color3, HemisphericLight, Mesh, MeshBuilder, PointLight, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new ArcRotateCamera('camera', -Math.PI / 2.2, Math.PI / 2.6, 11, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('fill', new Vector3(0, 1, 0), scene).intensity = 0.5;
  new PointLight('key', new Vector3(-5, 5, -8), scene);

  // The profile lies in the xy plane (z = 0): a five-pointed star.
  const shape: Vector3[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? 0.6 : 0.28;
    const a = (i / 10) * Math.PI * 2;
    shape.push(new Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
  }

  // A straight path along y: the `rotation` option twists the profile a little at each point.
  const path: Vector3[] = [];
  for (let i = 0; i <= 60; i++) path.push(new Vector3(0, i * 0.12 - 3.6, 0));

  const star = MeshBuilder.ExtrudeShape(
    'star',
    {
      shape,
      path,
      closeShape: true,
      scale: 1.4,
      rotation: 0.09,
      cap: Mesh.CAP_ALL,
      sideOrientation: Mesh.DOUBLESIDE,
    },
    scene,
  );
  const material = new StandardMaterial('material', scene);
  material.diffuseColor = new Color3(0.95, 0.75, 0.2);
  material.specularPower = 32;
  star.material = material;

  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.006;
    else star.rotation.y += 0.006;
  });

  return () => stage.dispose();
};

export default mount;
