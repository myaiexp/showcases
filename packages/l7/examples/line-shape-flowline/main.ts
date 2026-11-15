// LineLayer shape flowline: paired lines for flows in both directions
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { PARSER, rows, EUROPE } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [12,50],
      zoom: ctx.preview ? 2.3 : 3.3,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  // Both directions of every route, so each pair shows two lines.
  const out = rows('Paris', 8, EUROPE);
  const flows = [...out, ...out.map((r) => ({ ...r, lng1: r.lng2, lat1: r.lat2, lng2: r.lng1, lat2: r.lat1 }))];
  const layer = new LineLayer()
    .source(flows, PARSER)
    .shape('flowline')
    .size(3)
    .color('c')
    .style({ gapWidth: 3, strokeWidth: 1, stroke: '#0b131c' });
  scene.addLayer(layer);

  // Cards have no pointer, so the map drifts to look alive.
  if (stage.preview) stage.every(80, (i) => scene.setCenter([12 + Math.sin(i / 40) * 6, 50 + Math.cos(i / 55) * 2]));

  return () => stage.dispose();
};

export default mount;
