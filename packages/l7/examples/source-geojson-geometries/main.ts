// GeoJSON geometry types a source takes, from Point to MultiPolygon
import { type ILayer, LineLayer, PointLayer, PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
import { select } from '../../shared/controls.ts';
import { ring } from '../../shared/source-demo.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const TYPES = ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon (with a hole)', 'MultiPolygon'] as const;
type Kind = (typeof TYPES)[number];

const fc = (geometry: object, properties: object = { name: 'feature' }): object => ({ type: 'FeatureCollection', features: [{ type: 'Feature', properties, geometry }] });

const GEOMETRY: Record<Kind, object> = {
  Point: { type: 'Point', coordinates: [10, 49] },
  MultiPoint: { type: 'MultiPoint', coordinates: [[2, 47], [10, 49], [18, 52], [8, 41]] },
  LineString: { type: 'LineString', coordinates: [[-4, 41], [2, 47], [10, 49], [20, 52]] },
  MultiLineString: { type: 'MultiLineString', coordinates: [[[-4, 41], [2, 47], [8, 52]], [[12, 42], [16, 47], [24, 50]]] },
  'Polygon (with a hole)': { type: 'Polygon', coordinates: [ring([10, 49], 7, 8), ring([10, 49], 3, 8).reverse()] },
  MultiPolygon: { type: 'MultiPolygon', coordinates: [[ring([3, 47], 4, 6)], [ring([17, 51], 4, 6), ring([17, 51], 1.5, 6).reverse()]] },
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  let layer: ILayer | undefined;
  const show = (kind: Kind): void => {
    if (layer) scene.removeLayer(layer);
    const data = fc(GEOMETRY[kind]);
    // A source takes a FeatureCollection and draws each geometry with the layer that fits it.
    layer = kind.startsWith('Point') || kind === 'MultiPoint'
      ? new PointLayer().source(data).shape('circle').size(11).color('#ffd166').style({ stroke: '#0b131c', strokeWidth: 1 })
      : kind.includes('Line')
        ? new LineLayer().source(data).shape('line').size(3).color('#4ecdc4')
        : new PolygonLayer().source(data).shape('fill').color('#ff6b6b').style({ opacity: 0.75 });
    scene.addLayer(layer);
    const out = stage.readout();
    if (out) out.textContent = `${kind}\n${JSON.stringify(GEOMETRY[kind]).slice(0, 220)}`;
  };
  show('Point');
  if (stage.bar) select(stage.bar, 'geometry', TYPES, TYPES[0], show);
  else stage.every(1300, (i) => show(TYPES[i % TYPES.length] ?? TYPES[0]));

  return () => stage.dispose();
};

export default mount;
