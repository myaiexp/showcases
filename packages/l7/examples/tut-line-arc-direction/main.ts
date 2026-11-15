// Tutorial arc: swapping start and end mirrors the arc
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { PARSER } from '../../shared/line-data.ts';
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

  const data = [{ lng1: 2, lat1: 48, lng2: 24, lat2: 48 }];
  const swapped = data.map((d) => ({ lng1: d.lng2, lat1: d.lat2, lng2: d.lng1, lat2: d.lat1 }));
  const layer = new LineLayer({ blend: 'normal' }).source(data, PARSER).shape('arc').size(4).color('#ffd166').animate({ duration: 3, interval: 0.5, trailLength: 0.5 });
  scene.addLayer(layer);
  const set = (swap: boolean): void => { layer.setData(swap ? swapped : data, PARSER); };
  if (stage.bar) toggle(stage.bar, 'swap start and end', false, set);
  else stage.every(3000, (i) => set(i % 2 === 1));

  return () => stage.dispose();
};

export default mount;
