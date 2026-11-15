// globeMaterial(material): replace the globe's material with any Three.js material
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import {
  type Material,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshNormalMaterial,
  MeshStandardMaterial,
  MeshToonMaterial,
  TextureLoader,
} from 'three';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const atlasUrl = await texture('atlas');
  const map = new TextureLoader().load(atlasUrl);
  map.colorSpace = 'srgb';

  const materials: Record<string, Material> = {
    MeshStandardMaterial: new MeshStandardMaterial({ map, roughness: 0.35, metalness: 0.4 }),
    MeshToonMaterial: new MeshToonMaterial({ map }),
    MeshLambertMaterial: new MeshLambertMaterial({ color: '#e0b46c' }),
    MeshNormalMaterial: new MeshNormalMaterial(),
    'MeshBasicMaterial (wireframe)': new MeshBasicMaterial({ color: '#ff8fab', wireframe: true }),
  };
  const names = Object.keys(materials);
  stage.onDispose(() => {
    map.dispose();
    for (const m of Object.values(materials)) m.dispose();
  });

  const globe = stage.own(new Globe(stage.container)).globeMaterial(materials[names[0]!]!);
  globe.controls().autoRotate = true;

  if (stage.bar) select(stage.bar, 'globeMaterial', names, (n) => globe.globeMaterial(materials[n]!));
  else {
    let i = 0;
    stage.every(1800, () => globe.globeMaterial(materials[names[++i % names.length]!]!));
  }

  return stage.dispose;
};

export default mount;
