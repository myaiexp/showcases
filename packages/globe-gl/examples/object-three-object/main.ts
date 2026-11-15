// Objects: objectThreeObject returns a three.js Object3D for each datum
import Globe from 'globe.gl';
import { BoxGeometry, ConeGeometry, Mesh, MeshLambertMaterial, OctahedronGeometry, TorusGeometry } from 'three';
import type { Mount } from '@/types.ts';
import { cities, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A different mesh by population: cones, boxes, gems and rings. Objects stand with +Z pointing away from the globe.' });
  const dark = await texture('dark');

  // Geometries and materials are shared by every mesh and freed with the stage.
  const geoms = {
    cone: new ConeGeometry(3, 10, 14).rotateX(Math.PI / 2),
    box: new BoxGeometry(5, 5, 8),
    gem: new OctahedronGeometry(4.5),
    ring: new TorusGeometry(4.5, 1.2, 8, 20),
  };
  const mats = [0xffd166, 0x5ec8ff, 0xef476f, 0x9be37c].map((color) => new MeshLambertMaterial({ color }));
  stage.onDispose(() => {
    Object.values(geoms).forEach((g) => g.dispose());
    mats.forEach((m) => m.dispose());
  });

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .objectsData(cities.slice(0, stage.preview ? 16 : 30))
    .objectAltitude(0.03)
    .objectLabel((d) => (d as City).name)
    .objectThreeObject((d) => {
      const pop = (d as City).pop;
      const kind = pop > 20 ? 'cone' : pop > 12 ? 'box' : pop > 8 ? 'gem' : 'ring';
      const i = ['cone', 'box', 'gem', 'ring'].indexOf(kind);
      return new Mesh(geoms[kind], mats[i]);
    });

  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;
  globe.pointOfView({ lat: 20, lng: 20, altitude: 2.2 });

  return stage.dispose;
};

export default mount;
