// Markers with custom DOM: a temperature label per city, colored by value
import { Scene, Marker } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cities } from '../../shared/data.ts';
import { drift } from '../../shared/point-data.ts';
import { heatColor } from '../../shared/point-demo.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 42], zoom: ctx.preview ? 2.4 : 3.4 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  // The tutorial fetches rows { x, y, v }: a position and a temperature. These are made from the cities' latitudes.
  const nodes = cities
    .filter((c) => (ctx.preview ? c.continent === 'Europe' || c.continent === 'Asia' : true))
    .map((c) => ({ x: c.lng, y: c.lat, v: Math.round(34 - Math.abs(c.lat) * 0.6 + ((c.pop * 7) % 11) - 5) }));
  for (const node of nodes) {
    const el = document.createElement('label');
    el.textContent = `${node.v}℃`;
    el.style.cssText = `background:${heatColor(node.v)};border:1px solid ${heatColor(node.v)};color:#111;font:600 11px sans-serif;padding:1px 5px;border-radius:4px;white-space:nowrap`;
    const marker = new Marker({ element: el }).setLnglat({ lng: node.x, lat: node.y });
    scene.addMarker(marker);
  }
  scene.render();

  if (stage.preview) drift(stage, scene, [15, 42], 14);

  return () => stage.dispose();
};

export default mount;
