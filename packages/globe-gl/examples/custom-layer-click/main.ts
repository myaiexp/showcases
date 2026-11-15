// Custom layer: onCustomLayerClick and onCustomLayerRightClick give object, coords
import Globe from 'globe.gl';
import { Mesh, MeshLambertMaterial, SphereGeometry } from 'three';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { cities, city, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a ball to grow it and fly there; right-click to shrink it.' });
  const dark = await texture('dark');
  const log = stage.bar && readout(stage.bar, 'Click or right-click a ball');
  const data = cities.slice(0, 30);

  const geometry = new SphereGeometry(3, 16, 12);
  const material = new MeshLambertMaterial({ color: '#ffd166' });
  stage.onDispose(() => {
    geometry.dispose();
    material.dispose();
  });

  const meshes = new Map<City, Mesh>();
  const globe = stage.own(new Globe(stage.container)).globeImageUrl(dark);

  globe
    .customLayerData(data)
    .customLayerLabel((d) => (d as City).name)
    .customThreeObject((d: object) => {
      const c = d as City;
      const ball = new Mesh(geometry, material);
      const { x, y, z } = globe.getCoords(c.lat, c.lng, 0.03);
      ball.position.set(x, y, z);
      meshes.set(c, ball);
      return ball;
    })
    .onCustomLayerClick((d, _event, { lat, lng, altitude }) => {
      const c = d as City;
      meshes.get(c)!.scale.multiplyScalar(1.5);
      globe.pointOfView({ lat: c.lat, lng: c.lng, altitude: 1.6 }, 800);
      if (log) log.textContent = `Left-click on ${c.name} at ${lat.toFixed(1)}, ${lng.toFixed(1)}, altitude ${altitude.toFixed(2)}`;
    })
    .onCustomLayerRightClick((d, _event, { lat, lng }) => {
      const c = d as City;
      meshes.get(c)!.scale.multiplyScalar(1 / 1.5);
      if (log) log.textContent = `Right-click on ${c.name} at ${lat.toFixed(1)}, ${lng.toFixed(1)}`;
    });

  globe.pointOfView({ lat: 25, lng: 20, altitude: 2.2 });

  // Cards have no pointer: a fake one clicks a city every two seconds, right-clicking every other visit.
  if (stage.preview) {
    const ghost = stage.ghost(globe);
    const tour = ['London', 'Cairo', 'Lagos', 'Istanbul', 'Moscow', 'Delhi', 'Mumbai'].map(city);
    let i = 0;
    stage.every(2200, () => {
      const n = i++;
      const c = tour[n % tour.length]!;
      globe.pointOfView({ lat: c.lat - 10, lng: c.lng, altitude: 2.2 }, 600);
      stage.after(750, () => ghost.at(c.lat, c.lng, 0.03));
      stage.after(1400, () => ghost.click(n % 2 ? 2 : 0));
    });
  }

  return stage.dispose;
};

export default mount;
