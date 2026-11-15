// Halftone attenuation: dot size shrinks with view distance between near and far
import * as THREE from 'three/webgpu';
import { halftone } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { int, params, range, rgb } from '../../shared/params.ts';

const COUNT = 5;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { distance: 7 });

  const { u } = params(
    stage,
    {
      scale: range(2, 0, 4),
      radius: range(1.4, 0, 2),
      pattern: int(0, 0, 10),
      // 1 scales the dot radius by where the fragment sits between far and near.
      attenuation: int(1, 0, 1),
      near: range(5, 0, 20),
      far: range(13, 0, 20),
      color: rgb(0xf2c14e),
    },
    { presets: [{ attenuation: 1, near: 5, far: 13 }, { attenuation: 1, near: 3, far: 9 }, { attenuation: 0 }] },
  );

  const material = stage.own(new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 }));
  material.colorNode = halftone({
    scale: u.scale,
    radius: u.radius,
    pattern: u.pattern,
    attenuation: u.attenuation,
    near: u.near,
    far: u.far,
    color: u.color,
  });

  // A row of spheres receding from about 4.5 to 12 units; the whole row slides in depth,
  // so every sphere passes through the near and far limits.
  const geometry = stage.own(new THREE.SphereGeometry(0.6, 48, 24));
  const row = new THREE.Group();
  const balls: THREE.Mesh[] = [];
  for (let i = 0; i < COUNT; i++) {
    const ball = new THREE.Mesh(geometry, material);
    ball.position.set((i - (COUNT - 1) / 2) * 1.4, 0, 2.5 - i * 1.9);
    balls.push(ball);
    row.add(ball);
  }
  stage.scene.add(row);
  stage.frame((t) => {
    row.position.z = Math.sin(t * 0.5) * 2.2;
    for (const ball of balls) ball.rotation.y = t * 0.3;
  });

  stage.start();
  return stage.dispose;
};

export default mount;
