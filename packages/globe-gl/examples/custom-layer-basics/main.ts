// Custom layer: customThreeObject builds a three.js object per datum, at getCoords
import Globe from 'globe.gl';
import { CylinderGeometry, Mesh, MeshLambertMaterial } from 'three';
import type { Mount } from '@/types.ts';
import { cities, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The layer only keeps the objects in the scene; each one is placed and turned to stand on the surface in code.' });
  const dark = await texture('dark');

  const geometries: CylinderGeometry[] = [];
  const materials = [new MeshLambertMaterial({ color: '#ffd166' }), new MeshLambertMaterial({ color: '#5ec8ff' })];
  stage.onDispose(() => {
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
  });

  const globe = stage.own(new Globe(stage.container)).globeImageUrl(dark);

  globe
    .customLayerData(cities.slice(0, stage.preview ? 18 : 34))
    // The second argument is the globe's radius in scene units (100).
    .customThreeObject((d: object, globeRadius?: number) => {
      const city = d as City;
      const R = globeRadius ?? 100;
      const height = 0.04 * R + city.pop * 0.0035 * R;
      // A tower: base on the surface, tip toward +Z (away from the globe, once turned).
      const geometry = new CylinderGeometry(R * 0.012, R * 0.02, height, 10).translate(0, height / 2, 0).rotateX(Math.PI / 2);
      geometries.push(geometry);
      const tower = new Mesh(geometry, materials[city.lat >= 0 ? 0 : 1]);
      const { x, y, z } = globe.getCoords(city.lat, city.lng, 0);
      tower.position.set(x, y, z);
      // lookAt points an object's +Z at the target: straight out from the globe's centre.
      tower.lookAt(x * 2, y * 2, z * 2);
      return tower;
    });

  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;
  globe.pointOfView({ lat: 20, lng: 20, altitude: 2.3 });

  return stage.dispose;
};

export default mount;
