// size and color from an interval or from a callback
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { quakes, drift, cycle, holder } from '../../shared/point-data.ts';
import { select } from '../../shared/controls.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 25], zoom: ctx.preview ? 0.5 : 1.4 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  const data = quakes(ctx.preview ? 70 : 350);
  const make = (mode: string) => {
    const layer = new PointLayer().source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } }).shape('circle').style({ opacity: 0.5 });
    if (mode === 'interval') return layer.size('mag', [2, 30]).color('mag', ['#fff3b0', '#e36414']);
    return layer
      .size('mag', (mag) => mag * 3)
      .color('mag', (mag) => (mag > 5 ? '#e36414' : '#fff3b0'));
  };
  const show = holder(scene);
  const modes = ['interval', 'callback'];
  if (stage.bar) {
    show(make('interval'));
    select(stage.bar, 'mapping', modes, 'interval', (v) => show(make(v)));
  } else {
    cycle(stage, scene, modes, 1800, (v) => show(make(v)));
    drift(stage, scene, [20, 25], 30);
  }

  return () => stage.dispose();
};

export default mount;
