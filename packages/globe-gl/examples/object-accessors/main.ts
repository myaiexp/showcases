// Objects: objectLat, objectLng, objectAltitude, objectLabel as keys or functions
import Globe from 'globe.gl';
import { Mesh, MeshLambertMaterial, SphereGeometry } from 'three';
import type { Mount } from '@/types.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

// Data that does not use the default `lat`, `lng` and `name` keys.
interface Balloon {
  callsign: string;
  where: { y: number; x: number };
  height: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The data uses its own keys; hover a balloon for its callsign.' });
  const dark = await texture('dark');

  const balloons: Balloon[] = cities.slice(0, stage.preview ? 14 : 26).map((c, i) => ({
    callsign: `BAL-${100 + i}`,
    where: { y: c.lat, x: c.lng },
    height: 0.04 + (i % 5) * 0.03,
  }));

  const geometry = new SphereGeometry(3, 16, 12);
  const material = new MeshLambertMaterial({ color: '#7fd1ff' });
  stage.onDispose(() => {
    geometry.dispose();
    material.dispose();
  });

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .objectsData(balloons)
    .objectLat((d) => (d as Balloon).where.y)
    .objectLng((d) => (d as Balloon).where.x)
    .objectAltitude('height')
    .objectLabel('callsign')
    // Small spheres, since the default one is hardly visible at this distance.
    .objectThreeObject(() => new Mesh(geometry, material));

  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;
  globe.pointOfView({ lat: 20, lng: 20, altitude: 2.3 });

  return stage.dispose;
};

export default mount;
