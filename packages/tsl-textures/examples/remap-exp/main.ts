// remapExp() against linear remap(): even bands, and bands that narrow
import * as THREE from 'three/webgpu';
import { floor, positionGeometry, remap } from 'three/tsl';
import { remapExp } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lineup } from '../../shared/lineup.ts';
import { params, range } from '../../shared/params.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { u } = params(stage, { toMax: range(16, 4, 40) });

  const y = positionGeometry.y;
  // Both map y in [-1.1, 1.1] onto [1, toMax]. remap steps evenly; remapExp steps by a
  // constant ratio (it is toMin * (toMax / toMin) ^ t), so values rise slowly near toMin and the bands there are wide.
  const linear = remap(y, -1.1, 1.1, 1, u.toMax);
  const exp = remapExp(y, -1.1, 1.1, 1, u.toMax);

  // A new band starts at every whole number of the mapped value, so band edges show the spacing.
  const stripes = (v: THREE.Node<'float'>): THREE.Node<'vec3'> => floor(v).mod(2).mix(new THREE.Color(0x1d3557), new THREE.Color(0xf1faee));
  const basic = (colorNode: THREE.Node<'vec3'>): THREE.MeshBasicNodeMaterial => {
    const m = new THREE.MeshBasicNodeMaterial();
    m.colorNode = colorNode;
    return m;
  };
  lineup(
    stage,
    [
      { material: basic(stripes(linear)), label: 'remap(y, -1.1, 1.1, 1, toMax)' },
      { material: basic(stripes(exp)), label: 'remapExp(y, -1.1, 1.1, 1, toMax)' },
    ],
    { spin: 1 },
  );

  if (stage.preview) stage.frame((t) => void (u.toMax.value = 16 + 8 * Math.sin(t * 0.8)));

  stage.start();
  return stage.dispose;
};

export default mount;
