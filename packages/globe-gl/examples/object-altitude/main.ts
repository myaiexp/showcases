// Objects: objectAltitude sets the height above the surface, in globe radii
import Globe from 'globe.gl';
import { Mesh, MeshLambertMaterial, SphereGeometry } from 'three';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cities, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each sphere floats higher the bigger its city. The thin stems mark the same height from the ground.' });
  const dark = await texture('dark');
  const data = cities.slice(0, stage.preview ? 12 : 20);

  const geometry = new SphereGeometry(3, 16, 12);
  const material = new MeshLambertMaterial({ color: '#ffd166' });
  stage.onDispose(() => {
    geometry.dispose();
    material.dispose();
  });

  let scale = 0.008;
  const alt = (d: object): number => 0.01 + (d as City).pop * scale;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .objectsData(data)
    .objectLabel((d) => (d as City).name)
    .objectThreeObject(() => new Mesh(geometry, material))
    .objectAltitude(alt)
    .pointsData(data)
    .pointAltitude(alt)
    .pointRadius(0.1)
    .pointColor(() => 'rgba(255,255,255,.6)')
    .pointsTransitionDuration(0);

  const set = (v: number): void => {
    scale = v;
    globe.objectAltitude(alt).pointAltitude(alt);
  };
  globe.pointOfView({ lat: 25, lng: 20, altitude: 2.3 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.6;

  if (stage.bar) {
    slider(stage.bar, 'Altitude per million people', 0, 0.015, 0.0005, scale, set, (v) => v.toFixed(4));
  } else {
    let high = true;
    stage.every(2200, () => {
      set(high ? 0.003 : 0.01);
      high = !high;
    });
  }

  return stage.dispose;
};

export default mount;
