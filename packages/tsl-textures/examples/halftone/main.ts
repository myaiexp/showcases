// Halftone: dots kept and the rest discarded on a screen-space pattern, tuned live
import * as THREE from 'three/webgpu';
import { halftone } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { int, params, range, rgb } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  const { u } = params(
    stage,
    {
      scale: range(2, 0, 4),
      radius: range(0.5, 0, 2),
      pattern: int(1, 0, 10),
      attenuation: int(0, 0, 1),
      near: range(6, 0, 20),
      far: range(14, 0, 20),
      // The default is vertexColor(), and these meshes have no colour attribute.
      color: rgb(0xf2c14e),
    },
    {
      presets: [
        { scale: 2, radius: 0.5, pattern: 1, attenuation: 0, near: 6, far: 14 },
        { scale: 1.008, radius: 0.14, pattern: 10, attenuation: 0, near: 6, far: 14 },
        { scale: 3.06, radius: 1.7, pattern: 8, attenuation: 1, near: 5.4, far: 10.6 },
      ],
    },
  );

  // The texture discards the fragments between the dots, so the colour goes on colorNode too.
  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = halftone({
    scale: u.scale,
    radius: u.radius,
    pattern: u.pattern,
    attenuation: u.attenuation,
    near: u.near,
    far: u.far,
    color: u.color,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
