// globeMaterial(): read the default Phong material, add a shiny-ocean specular map
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { color, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { Color, type MeshPhongMaterial, TextureLoader } from 'three';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The specular map is white over the ocean, so only water catches the light.' });
  const [day, water] = await Promise.all([texture('day'), texture('water')]);

  const globe = stage.own(new Globe(stage.container)).globeImageUrl(day);
  globe.pointOfView({ lat: 10, lng: -30, altitude: 2.2 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.4;

  // With no argument, globeMaterial() returns the material in use: a MeshPhongMaterial.
  const material = globe.globeMaterial() as MeshPhongMaterial;
  const specularMap = new TextureLoader().load(water);
  material.specularMap = specularMap;
  material.specular = new Color('#6a8caf');
  material.shininess = 18;
  stage.onDispose(() => specularMap.dispose());

  if (stage.bar) {
    slider(stage.bar, 'shininess', 1, 80, 1, material.shininess, (v) => (material.shininess = v));
    color(stage.bar, 'specular', '#6a8caf', (c) => material.specular.set(c));
  }

  return stage.dispose;
};

export default mount;
