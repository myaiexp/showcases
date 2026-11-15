// noise, noise3, fractal and fractal3 on one sphere each, drifting through space
import * as THREE from 'three/webgpu';
import { positionGeometry, time, vec3 } from 'three/tsl';
import { fractal, fractal3, noise, noise3 } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lineup } from '../../shared/lineup.ts';
import { int, params, range } from '../../shared/params.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { u } = params(stage, { scale: range(2.5, 0.5, 8), octaves: int(4, 1, 8), lacunarity: range(2, 1, 4), diminish: range(0.5, 0.1, 0.9) });

  // The sample point: the vertex position, scaled, sliding along z so the field moves.
  const p = positionGeometry.mul(u.scale).add(vec3(0, 0, time.mul(0.4)));
  const warm = new THREE.Color(0xffb347);
  const cool = new THREE.Color(0x1f3a93);
  // The float versions return a value near [-1, 1]; remap it to [0, 1] to mix two colours.
  const tint = (v: THREE.Node<'float'>): THREE.Node<'vec3'> => v.mul(0.5).add(0.5).saturate().mix(cool, warm);
  // The vec3 versions return three independent values: use them as red, green and blue.
  const rgb = (v: THREE.Node<'vec3'>): THREE.Node<'vec3'> => v.mul(0.5).add(0.5).saturate();

  const basic = (colorNode: THREE.Node<'vec3'>): THREE.MeshBasicNodeMaterial => {
    const m = new THREE.MeshBasicNodeMaterial();
    m.colorNode = colorNode;
    return m;
  };
  lineup(
    stage,
    [
      { material: basic(tint(noise(p))), label: 'noise(p)' },
      { material: basic(rgb(noise3(p))), label: 'noise3(p)' },
      // fractal(position, octaves, lacunarity, diminish, amplitude): octaves of noise, each
      // lacunarity times finer and diminish times weaker.
      { material: basic(tint(fractal(p, u.octaves, u.lacunarity, u.diminish))), label: 'fractal(p, octaves, ...)' },
      { material: basic(rgb(fractal3(p, u.octaves, u.lacunarity, u.diminish))), label: 'fractal3(p, octaves, ...)' },
    ],
    { columns: stage.preview ? 2 : 4, spin: 1 },
  );

  stage.start();
  return stage.dispose;
};

export default mount;
