// source.getClustersLeaves(cluster_id) on click: the points inside the clicked cluster
import { type ILayer, PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { tour } from '../../shared/layer-demo.ts';
import { quakes } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

interface ClusterFeature {
  properties?: { cluster_id?: number; point_count?: number };
  cluster_id?: number;
  point_count?: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 45], zoom: ctx.preview ? 2.4 : 3 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const around = [
    { name: 'a', lng: -3, lat: 40, pop: 1, continent: 'Europe' as const },
    { name: 'b', lng: 12, lat: 48, pop: 1, continent: 'Europe' as const },
    { name: 'c', lng: 30, lat: 52, pop: 1, continent: 'Europe' as const },
  ];
  const data = quakes(ctx.preview ? 120 : 260, { spread: 3, around });
  const layer = new PointLayer()
    .source(data, { parser: { type: 'json', x: 'lng', y: 'lat' }, cluster: true })
    .shape('circle')
    .size('point_count', (n: number) => (n ? 8 + Math.sqrt(n) * 3 : 5))
    .color('#4ecdc4')
    .style({ opacity: 0.7 })
    .active(true);
  scene.addLayer(layer);

  const out = stage.readout();
  let leaves: ILayer | undefined;
  const showLeaves = (id: number): void => {
    // The leaves are GeoJSON features: the original rows, as points.
    const found = layer.getSource().getClustersLeaves(id) as unknown[];
    const fc = { type: 'FeatureCollection', features: found };
    if (leaves) leaves.setData(fc, { parser: { type: 'geojson' } });
    else {
      leaves = new PointLayer({ zIndex: 3 }).source(fc, { parser: { type: 'geojson' } }).shape('circle').size(6).color('#ff4d4d');
      scene.addLayer(leaves);
    }
    if (out) out.textContent = `getClustersLeaves(${id}) -> ${found.length} points`;
  };
  layer.on('click', (e: { feature: ClusterFeature }) => {
    const id = e.feature.cluster_id ?? e.feature.properties?.cluster_id;
    if (id !== undefined) showLeaves(id);
  });
  // Start with the biggest cluster at the opening zoom already expanded.
  layer.on('inited', () => {
    // getClusters returns a plain array of features here (the docs say a FeatureCollection).
    const all = layer.getSource().getClusters(Math.round(scene.getZoom())) as ClusterFeature[];
    const big = all.filter((f) => (f.properties?.point_count ?? f.point_count ?? 0) > 1).sort((a, b) => (b.properties?.point_count ?? 0) - (a.properties?.point_count ?? 0))[0];
    const id = big?.cluster_id ?? big?.properties?.cluster_id;
    if (id !== undefined) showLeaves(id);
  });

  if (stage.preview) {
    // The clusters sit around three centres: click each in turn.
    tour(stage, scene, around.map((a) => [a.lng, a.lat] as [number, number]), { ms: 700, clickEvery: 1 });
  }

  return () => stage.dispose();
};

export default mount;
