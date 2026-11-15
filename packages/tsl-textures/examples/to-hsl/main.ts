// toHsl(): split a texture's colour into h, s, l, shift the hue and convert back
import * as THREE from 'three/webgpu';
import { positionGeometry, vec3 } from 'three/tsl';
import { camouflage, hsl, toHsl } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lineup } from '../../shared/lineup.ts';
import { params, range } from '../../shared/params.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { u } = params(stage, { hueShift: range(0.33, 0, 1), saturation: range(1, 0, 2), lightness: range(1, 0.2, 2) });

  // Any texture's output is an rgb vec3.
  const original = camouflage({ position: positionGeometry, scale: 1.5 });
  // toHsl() gives vec3(h, s, l), each in [0, 1]. Edit the parts, then hsl() converts back.
  const c = toHsl(original);
  const shifted = hsl(vec3(c.x.add(u.hueShift), c.y.mul(u.saturation).saturate(), c.z.mul(u.lightness).saturate()));

  const basic = (colorNode: THREE.Node<'vec3'>): THREE.MeshBasicNodeMaterial => {
    const m = new THREE.MeshBasicNodeMaterial();
    m.colorNode = colorNode;
    return m;
  };
  lineup(
    stage,
    [
      { material: basic(original), label: 'camouflage()' },
      { material: basic(shifted), label: 'hsl(toHsl(...) edited)' },
    ],
    { spin: 1.5 },
  );

  // A card turns the hue all the way round.
  if (stage.preview) stage.frame((t) => void (u.hueShift.value = (t * 0.12) % 1));

  stage.start();
  return stage.dispose;
};

export default mount;
