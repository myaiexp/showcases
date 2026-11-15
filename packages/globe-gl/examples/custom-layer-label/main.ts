// Custom layer: customLayerLabel tooltip and onCustomLayerHover for custom objects
import Globe from 'globe.gl';
import { Mesh, MeshLambertMaterial, OctahedronGeometry } from 'three';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { cities, city, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a gem: customLayerLabel supplies the tooltip, onCustomLayerHover the highlight.' });
  const dark = await texture('dark');
  const log = stage.bar && readout(stage.bar, 'Hover a gem');
  const data = cities.slice(0, 30);

  const geometry = new OctahedronGeometry(4);
  const normal = new MeshLambertMaterial({ color: '#5ec8ff' });
  const lit = new MeshLambertMaterial({ color: '#ff5d73', emissive: '#661020' });
  stage.onDispose(() => {
    geometry.dispose();
    normal.dispose();
    lit.dispose();
  });

  const meshes = new Map<City, Mesh>();
  const globe = stage.own(new Globe(stage.container)).globeImageUrl(dark);

  globe
    .customLayerData(data)
    // Plain text, an HTML string or an element, like every layer's label.
    .customLayerLabel((d) => `<b>${(d as City).name}</b><br>${(d as City).pop} million people`)
    .customThreeObject((d: object) => {
      const c = d as City;
      const gem = new Mesh(geometry, normal);
      const { x, y, z } = globe.getCoords(c.lat, c.lng, 0.04);
      gem.position.set(x, y, z);
      meshes.set(c, gem);
      return gem;
    })
    .onCustomLayerHover((d, prev) => {
      // The layer passes the datum (or null), so look the mesh up from it.
      if (prev) meshes.get(prev as City)!.material = normal;
      if (d) meshes.get(d as City)!.material = lit;
      if (log) log.textContent = d ? `Hovering ${(d as City).name}` : 'Hover a gem';
    });

  globe.pointOfView({ lat: 25, lng: 20, altitude: 2.2 });
  stage.loop((_dt, t) => {
    // Gems turn in place, so the card is alive too.
    for (const m of meshes.values()) m.rotation.y = t * 1.5;
  });

  // Cards have no pointer: a fake one visits a city every two seconds.
  if (stage.preview) {
    const ghost = stage.ghost(globe);
    const tour = ['London', 'Cairo', 'Lagos', 'Istanbul', 'Moscow', 'Delhi', 'Mumbai'].map(city);
    let i = 0;
    stage.every(1800, () => {
      const c = tour[i++ % tour.length]!;
      globe.pointOfView({ lat: c.lat - 10, lng: c.lng, altitude: 2.2 }, 600);
      stage.after(750, () => ghost.at(c.lat, c.lng, 0.04));
    });
    stage.every(5400, () => stage.after(1500, () => ghost.leave()));
  }

  return stage.dispose;
};

export default mount;
