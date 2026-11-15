// Two textures are two TSL nodes: mix() blends them by any mask
import * as THREE from 'three/webgpu';
import { mix, positionGeometry, sin, smoothstep, time } from 'three/tsl';
import { marble, wood } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { model } from '../../shared/shapes.ts';
import { params, range } from '../../shared/params.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { u } = params(stage, { edge: range(0.15, 0.01, 1), sweep: range(0.6, 0, 1.2) }, { title: 'Mask' });

  // Each call returns a vec3 colour node.
  const stone = marble({ scale: 1.4, color: new THREE.Color(0x2b2d42), background: new THREE.Color(0xedf2f4) });
  const timber = wood({ scale: 2 });

  // 0 below the moving line, 1 above it, blurred over `edge`.
  const line = sin(time.mul(0.7)).mul(u.sweep);
  const mask = smoothstep(u.edge.negate(), u.edge, positionGeometry.y.sub(line));

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = mix(stone, timber, mask);
  model(stage, material, { spin: 1 });

  stage.start();
  return stage.dispose;
};

export default mount;
