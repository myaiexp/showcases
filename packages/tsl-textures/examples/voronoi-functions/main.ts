// voronoi, voronoi2 and voronoi3: distance to the nearest feature points
import * as THREE from 'three/webgpu';
import { positionGeometry, time, vec3 } from 'three/tsl';
import { voronoi, voronoi2, voronoi3 } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lineup } from '../../shared/lineup.ts';
import { params, range } from '../../shared/params.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { u } = params(stage, { scale: range(2.5, 0.5, 8), jitter: range(1, 0, 1) });

  const p = positionGeometry.mul(u.scale).add(vec3(0, 0, time.mul(0.3)));
  const basic = (colorNode: THREE.Node<'vec3'>): THREE.MeshBasicNodeMaterial => {
    const m = new THREE.MeshBasicNodeMaterial();
    m.colorNode = colorNode;
    return m;
  };
  // jitter 0 puts the feature points on a regular grid; 1 scatters them in their cells.
  const warm = new THREE.Color(0xffb347);
  const cool = new THREE.Color(0x1f3a93);
  const v2 = voronoi2(p, u.jitter);

  lineup(
    stage,
    [
      // One float: the distance to the nearest point.
      { material: basic(voronoi(p, u.jitter).saturate().mix(warm, cool)), label: 'voronoi(p, jitter)' },
      // vec2: nearest and second nearest distance as red and green; their gap draws the borders.
      { material: basic(vec3(v2.x, v2.y, v2.y.sub(v2.x))), label: 'voronoi2(p, jitter)' },
      // vec3: one distance per channel.
      { material: basic(voronoi3(p, u.jitter).saturate()), label: 'voronoi3(p, jitter)' },
    ],
    { spin: 1 },
  );

  stage.start();
  return stage.dispose;
};

export default mount;
