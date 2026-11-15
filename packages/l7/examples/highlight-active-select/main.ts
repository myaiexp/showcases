// Hover highlight with active() and click selection with select(), on country polygons
import { LineLayer, PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { borders, countries } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 50], zoom: ctx.preview ? 2 : 3 }),
  });
  await stage.ready(scene);

  const fill = new PolygonLayer()
    .source(countries)
    .shape('fill')
    .color('id', ['#24425f', '#2c5577', '#356a8e', '#3f7fa5'])
    .style({ opacity: 0.9 })
    // Hover: the element under the pointer is mixed 40% toward the highlight colour.
    .active({ color: '#ffd166', mix: 0.4 })
    // Click: the clicked element keeps a solid highlight until another one is clicked.
    .select({ color: '#ff6b6b' });
  const lines = new LineLayer()
    .source({ type: 'FeatureCollection', features: [{ type: 'Feature', properties: {}, geometry: borders }] })
    .shape('line')
    .size(0.6)
    .color('#0b131c');
  scene.addLayer(fill);
  scene.addLayer(lines);

  const out = stage.readout();
  fill.on('click', (e: { feature: { properties: { name: string } } }) => {
    if (out) out.textContent = `selected: ${e.feature.properties.name}`;
  });

  // Cards: a ghost pointer wanders over Europe and clicks now and then.
  if (stage.preview) {
    const ghost = stage.ghost(scene);
    const stops: [number, number][] = [[2.3, 46.5], [10.4, 51.1], [-3.7, 40.3], [19.1, 52], [12.5, 42.8], [25, 61.9]];
    // Odd ticks move, every fourth tick clicks where the pointer rests.
    stage.every(500, (i) => {
      if (i % 4 === 0) return ghost.click();
      if (i % 2 === 0) return;
      const p = stops[((i - 1) / 2) % stops.length];
      if (p) ghost.moveTo(p);
    });
  }

  return () => stage.dispose();
};

export default mount;
