// spherical(): a plane's uv becomes angles, so positionNode wraps it into a sphere
import * as THREE from 'three/webgpu';
import { floor, mix, normalLocal, positionGeometry, transformNormalToView, uv, vec2, vec3 } from 'three/tsl';
import { hsl, spherical } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { distance: 4.6 });
  const { u } = params(stage, { blend: range(1, 0, 1), radius: range(1, 0.4, 1.6) });

  // uv.y runs from the pole (phi = 0) to the opposite pole (phi = PI); uv.x once round (theta).
  const phi = uv().y.oneMinus().mul(Math.PI);
  const theta = uv().x.mul(Math.PI * 2);
  // spherical(phi, theta) is a point on the unit sphere; blend slides each vertex there.
  const onSphere = spherical(phi, theta);
  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0, side: THREE.DoubleSide });
  material.positionNode = mix(positionGeometry, onSphere.mul(u.radius), u.blend);
  // The unit sphere's normal is the point itself; the plane's is normalLocal.
  material.normalNode = transformNormalToView(mix(normalLocal, onSphere, u.blend).normalize());

  // A longitude and latitude checkerboard, hue by longitude, so the wrap is easy to follow.
  const cell = floor(uv().mul(vec2(24, 12)));
  const checker = cell.x.add(cell.y).mod(2);
  material.colorNode = hsl(vec3(uv().x, 0.65, checker.mul(0.25).add(0.4)));

  // A plane needs many vertices to bend smoothly; it has no tangents to compute (tangents: false).
  model(stage, material, { shape: 'plane', dense: true, picker: false, tangents: false, spin: 4 });

  if (stage.preview) stage.frame((t) => void (u.blend.value = 0.5 + 0.5 * Math.sin(t * 0.7 - 1.2)));

  stage.start();
  return stage.dispose;
};

export default mount;
