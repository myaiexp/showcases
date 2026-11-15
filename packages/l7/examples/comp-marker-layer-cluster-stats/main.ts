// MarkerLayer cluster field and method, with the element callback building each cluster
import { Marker, MarkerLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { badge, EUROPE_CENTER, europeZoom, spots } from '../../shared/comp-demo.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const METHODS = ['sum', 'max', 'min', 'mean'] as const;
type Method = (typeof METHODS)[number];
// element receives the cluster as a GeoJSON feature: point_count and point_<method> sit in its properties.
type ClusterFeature = { properties: { point_count?: number; [stat: string]: unknown } };

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const data = spots(ctx.preview ? 50 : 120, 9);
  let layer: MarkerLayer | undefined;
  const build = (method: Method): void => {
    if (layer) {
      layer.clear();
      scene.removeMarkerLayer(layer);
    }
    layer = new MarkerLayer({
      cluster: true,
      clusterOption: {
        radius: 45,
        field: 'value',
        method,
        // element turns each cluster into DOM: here its size, the statistic and the count.
        element: (feature: ClusterFeature) => {
          const info = feature.properties;
          const count = info.point_count ?? 1;
          const stat = Number(info[`point_${method}`] ?? 0);
          // The text is the statistic; the badge grows with the count.
          const b = badge(`${Math.round(stat)}`, stat > 150 ? '#ff6b6b' : '#4ecdc4');
          b.style.padding = `${2 + Math.min(count, 8)}px ${6 + Math.min(count, 8)}px`;
          return b;
        },
      },
    });
    // Markers carry the row as extData: the cluster reads field 'value' from it.
    for (const d of data) layer.addMarker(new Marker({ element: badge(String(d.value), '#ffd166'), extData: d }).setLnglat({ lng: d.lng, lat: d.lat }));
    scene.addMarkerLayer(layer);
    const out = stage.readout();
    if (out) out.textContent = `clusterOption: { field: 'value', method: '${method}', element }\nEach cluster shows point_${method} of its markers' value and its point_count.`;
  };
  stage.own(() => layer?.clear());
  build('sum');
  if (stage.bar) select(stage.bar, 'method', METHODS, 'sum', build);
  else {
    stage.every(1500, (i) => build(METHODS[i % METHODS.length] ?? 'sum'));
    // Zoom in and out in steps, so the clusters split and merge.
    stage.every(1900, (i) => scene.setZoom(2.4 + (i % 3) * 0.7));
  }

  return () => stage.dispose();
};

export default mount;
