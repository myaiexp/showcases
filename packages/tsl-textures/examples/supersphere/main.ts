// Supersphere: positionNode reshapes a sphere between star, ball and rounded cube
import * as THREE from 'three/webgpu';
import { grid, supersphere } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { distance: 4.6 });

  const { u } = params(
    stage,
    // The power-of-two exponent: 1 keeps the sphere, below it pinches, above it squares off.
    { exponent: range(3, -1, 7) },
    { presets: [{ exponent: -0.4 }, { exponent: 1 }, { exponent: 3 }] },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.45, metalness: 0 });
  material.positionNode = supersphere({ exponent: u.exponent });
  material.normalNode = supersphere.normal({ exponent: u.exponent });
  material.colorNode = grid({ countU: 32, countV: 16, thinness: 0.85, color: new THREE.Color(0x14213d), background: new THREE.Color(0xfca311) });

  // Built for a sphere: it moves each vertex along its direction from the centre.
  model(stage, material, { shape: 'sphere', dense: true, spin: 1.5, picker: false });

  stage.start();
  return stage.dispose;
};

export default mount;
