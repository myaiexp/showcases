// Source cluster and updateClusterData(zoom): draw clusters at a chosen zoom
import { PointLayer, Scene, Source } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { EUROPE_CENTER, europeZoom, spots } from '../../shared/comp-demo.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  // cluster and clusterOptions are source options: the source builds the clusters.
  const source = new Source(spots(ctx.preview ? 80 : 200), {
    parser: { type: 'json', x: 'lng', y: 'lat' },
    cluster: true,
    clusterOptions: { radius: 40, maxZoom: 16 },
  });
  const layer = new PointLayer()
    .source(source)
    .shape('circle')
    .size('point_count', [6, 26])
    .color('point_count', ['#ffd166', '#ff9f43', '#ff6b6b'])
    .style({ opacity: 0.85, stroke: '#0b131c', strokeWidth: 1 });
  scene.addLayer(layer);

  const out = stage.readout();
  const apply = (zoom: number): void => {
    // Redraw the clusters as they would be at this zoom, whatever the map's own zoom is.
    source.updateClusterData(zoom);
    source.emit('update', { type: 'update' });
    if (out) out.textContent = `source.updateClusterData(${zoom})\npoints drawn: ${source.data.dataArray.length}, getClusters(${zoom}).length: ${source.getClusters(zoom).length}`;
  };
  if (stage.bar) slider(stage.bar, 'updateClusterData(zoom)', [0, 10, 1], 2, apply);
  if (stage.bar) apply(2);
  else stage.every(1200, (i) => apply([1, 3, 5, 7][i % 4] ?? 2));

  return () => stage.dispose();
};

export default mount;
