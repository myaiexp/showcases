// Objects: objectLabel tooltip, onObjectHover lift, onObjectClick, right click
import Globe from 'globe.gl';
import { ConeGeometry, Mesh, MeshLambertMaterial } from 'three';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { cities, city, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a cone to lift it, click to fly there, right-click to turn it round.' });
  const dark = await texture('dark');
  const log = stage.bar && readout(stage.bar, 'Hover, click or right-click an object');
  const data = cities.slice(0, 30);

  const geometry = new ConeGeometry(2.8, 12, 14).rotateX(Math.PI / 2);
  const material = new MeshLambertMaterial({ color: '#ffd166' });
  stage.onDispose(() => {
    geometry.dispose();
    material.dispose();
  });

  let hovered: City | null = null;
  const flipped = new Set<City>();
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .objectsData(data)
    .objectLabel((d) => `<b>${(d as City).name}</b><br>${(d as City).pop} million people`)
    .objectThreeObject(() => new Mesh(geometry, material))
    .objectAltitude((d) => ((d as City) === hovered ? 0.12 : 0.02))
    .objectRotation((d) => ({ x: flipped.has(d as City) ? 180 : 0 }))
    .onObjectHover((obj) => {
      hovered = obj as City | null;
      // Accessors are read again only when set, so set the altitude again to lift or drop it.
      globe.objectAltitude(globe.objectAltitude());
      if (log && hovered) log.textContent = `Hovering ${hovered.name}`;
    })
    .onObjectClick((obj, _event, { lat, lng, altitude }) => {
      const c = obj as City;
      globe.pointOfView({ lat: c.lat, lng: c.lng, altitude: 1.4 }, 1000);
      if (log) log.textContent = `Clicked ${c.name} at ${lat.toFixed(1)}, ${lng.toFixed(1)}, altitude ${altitude.toFixed(2)}`;
    })
    .onObjectRightClick((obj) => {
      const c = obj as City;
      if (!flipped.delete(c)) flipped.add(c);
      globe.objectRotation(globe.objectRotation());
      if (log) log.textContent = `Turned ${c.name} ${flipped.has(c) ? 'upside down' : 'upright'}`;
    });
  globe.pointOfView({ lat: 25, lng: 20, altitude: 2.2 });

  // Cards have no pointer: a fake one visits a city every two seconds and clicks it.
  if (stage.preview) {
    const ghost = stage.ghost(globe);
    const tour = ['London', 'Cairo', 'Lagos', 'Istanbul', 'Moscow', 'Delhi', 'Mumbai'].map(city);
    let i = 0;
    stage.every(2000, () => {
      const c = tour[i++ % tour.length]!;
      globe.pointOfView({ lat: c.lat - 10, lng: c.lng, altitude: 2.2 }, 600);
      stage.after(700, () => ghost.at(c.lat, c.lng, 0.04));
      stage.after(1300, () => ghost.click());
    });
  }

  return stage.dispose;
};

export default mount;
