// Markers that hold a small chart: a bar chart per city sized by its total
import { Scene, Marker } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { barChart } from '../../shared/point-demo.ts';
import { cities } from '../../shared/data.ts';
import { drift } from '../../shared/point-data.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 45], zoom: ctx.preview ? 2.8 : 3.6 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  // The tutorial fetches nodes with a gdp split into three sectors; these are made from each city's population.
  const picks = cities.filter((c) => c.continent === 'Europe' || (c.continent === 'Asia' && c.lng < 60));
  for (const c of picks) {
    const gdp = { agriculture: 4 + (c.pop % 5), industry: 10 + ((c.pop * 3) % 14), service: 12 + ((c.pop * 5) % 22) };
    const total = gdp.agriculture + gdp.industry + gdp.service;
    const el = barChart([gdp.agriculture, gdp.industry, gdp.service], ['#5CCEA1', '#5D7092', '#5B8FF9'], Math.min(30 + total, 70));
    const marker = new Marker({ element: el }).setLnglat({ lng: c.lng, lat: c.lat });
    scene.addMarker(marker);
  }
  scene.render();

  if (stage.preview) drift(stage, scene, [15, 45], 12);

  return () => stage.dispose();
};

export default mount;
