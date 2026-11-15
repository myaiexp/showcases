// layer.getSource().getClusters(zoom): the aggregated features at a chosen zoom, drawn as rings
import { type ILayer, PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { quakes } from '../../shared/point-data.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 35], zoom: ctx.preview ? 1.4 : 2.2 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const data = quakes(ctx.preview ? 200 : 400, { spread: 4 });
  const clustered = new PointLayer()
    .source(data, { parser: { type: 'json', x: 'lng', y: 'lat' }, cluster: true, clusterOptions: { radius: 40, minZoom: 0, maxZoom: 16 } })
    .shape('circle')
    .size('point_count', (n: number) => (n ? 5 + Math.sqrt(n) * 2 : 4))
    .color('#ffd166')
    .style({ opacity: 0.5 });
  scene.addLayer(clustered);

  // The rings come from the source itself, not from the layer's current zoom: they are added
  // once the clustered layer has built its source.
  const show = valuePanel(stage.container, 'tl');
  let rings: ILayer | undefined;
  const ringsFor = (zoom: number): { type: 'FeatureCollection'; features: unknown[] } => {
    // Docs say IFeatureCollection; 2.29.1 returns a plain array of features.
    const found = clustered.getSource().getClusters(zoom) as unknown[];
    show({ [`getClusters(${zoom})`]: `${found.length} features` });
    return { type: 'FeatureCollection', features: found };
  };
  const draw = (zoom: number): void => {
    if (!rings) return;
    rings.setData(ringsFor(zoom), { parser: { type: 'geojson' } });
  };
  clustered.on('inited', () => {
    if (stage.disposed) return;
    rings = new PointLayer({ zIndex: 3 })
      .source(ringsFor(2), { parser: { type: 'geojson' } })
      .shape('circle')
      .size('point_count', (n: number) => (n ? 5 + Math.sqrt(n) * 2 : 4))
      .color('#ffffff')
      .style({ opacity: 0.35, stroke: '#ffffff', strokeWidth: 2 });
    scene.addLayer(rings);
  });
  if (stage.bar) slider(stage.bar, 'zoom', [0, 8, 1], 2, draw);
  else stage.every(1000, (i) => draw(i % 6));

  return () => stage.dispose();
};

export default mount;
