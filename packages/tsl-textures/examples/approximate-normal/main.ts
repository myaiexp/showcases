// approximateNormal(): a bumpy sphere lit with and without rebuilt normals
import * as THREE from 'three/webgpu';
import { cross, Fn, normalLocal, positionGeometry, sin, tangentLocal, time } from 'three/tsl';
import { approximateNormal } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lineup } from '../../shared/lineup.ts';
import { params, range } from '../../shared/params.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { u } = params(stage, { amplitude: range(0.18, 0, 0.35), frequency: range(5, 1, 10) });

  // The displacement: push each point along its own direction by a product of sines.
  const surface = Fn(([p]: [THREE.Node<'vec3'>]) => {
    const f = u.frequency;
    const bump = sin(p.x.mul(f).add(time)).mul(sin(p.y.mul(f))).mul(sin(p.z.mul(f).sub(time)));
    return p.mul(bump.mul(u.amplitude).add(1));
  });

  // The way the shape textures' .normal functions do it: move two neighbours, one a step
  // along the tangent and one along the bitangent, and take the normal of the triangle.
  const EPS = 0.01;
  const normal = normalLocal.normalize();
  const tangent = tangentLocal.normalize().mul(EPS);
  const bitangent = cross(normal, tangent).normalize().mul(EPS);
  const bumpNormal = approximateNormal(
    surface(positionGeometry),
    surface(positionGeometry.add(tangent)),
    surface(positionGeometry.add(bitangent)),
  );

  const make = (withNormal: boolean): THREE.MeshStandardNodeMaterial => {
    const m = new THREE.MeshStandardNodeMaterial({ roughness: 0.35, metalness: 0.1, color: 0xe9c46a });
    m.positionNode = surface(positionGeometry);
    // Without a normalNode the lighting still uses the original sphere's normals.
    if (withNormal) m.normalNode = bumpNormal;
    return m;
  };
  const meshes = lineup(
    stage,
    [
      { material: make(false), label: 'positionNode only' },
      { material: make(true), label: '+ approximateNormal' },
    ],
    { spin: 1 },
  );
  // lineup does not compute tangents, and tangentLocal reads that attribute: both meshes
  // share one geometry, so this once is enough.
  meshes[0]!.geometry.computeTangents();

  stage.start();
  return stage.dispose;
};

export default mount;
