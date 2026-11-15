// Objects: objectRotation turns each object about x, y and z, in degrees
import Globe from 'globe.gl';
import { ConeGeometry, Mesh, MeshLambertMaterial } from 'three';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cities, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each arrow lies flat on the surface; objectRotation turns it about its own up axis (z).' });
  const dark = await texture('dark');
  const data = cities.slice(0, stage.preview ? 14 : 24);

  // An arrow lying along local +X, with local +Z pointing away from the globe.
  const geometry = new ConeGeometry(2.6, 12, 12).rotateZ(-Math.PI / 2);
  const material = new MeshLambertMaterial({ color: '#ffd166' });
  stage.onDispose(() => {
    geometry.dispose();
    material.dispose();
  });

  let heading = 0;
  // Each object has its own start angle; the shared heading is added to it.
  const rotation = (d: object) => ({ z: (data.indexOf(d as City) * 47 + heading) % 360 });
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .objectsData(data)
    .objectLabel((d) => (d as City).name)
    .objectAltitude(0.02)
    .objectThreeObject(() => new Mesh(geometry, material))
    .objectRotation(rotation);

  const turn = (deg: number): void => {
    heading = deg;
    globe.objectRotation(rotation);
  };
  globe.pointOfView({ lat: 20, lng: 20, altitude: 2.2 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.6;

  if (stage.bar) {
    slider(stage.bar, 'Added heading', 0, 360, 5, heading, turn, (v) => `${v}°`);
  } else {
    stage.every(120, () => turn((heading + 6) % 360));
  }

  return stage.dispose;
};

export default mount;
