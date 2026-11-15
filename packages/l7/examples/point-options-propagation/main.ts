// new PointLayer({ enablePropagation }): let events reach layers underneath
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { holder } from '../../shared/point-data.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 4.2 : 5 }),
  });
  await stage.ready(scene);

  const spot = [{ lng: 10, lat: 46 }];
  const make = (enablePropagation: boolean) => {
    const below = new PointLayer({ name: 'below' }).source(spot, { parser: { type: 'json', x: 'lng', y: 'lat' } }).shape('circle').size(ctx.preview ? 50 : 76).color('#5B8FF9');
    const above = new PointLayer({ name: 'above', enablePropagation })
      .source(spot, { parser: { type: 'json', x: 'lng', y: 'lat' } })
      .shape('circle')
      .size(ctx.preview ? 30 : 44)
      .color('#ff6b6b');
    return { below, above };
  };
  const state = { heard: [] as string[] };
  const out = stage.readout();
  const show = holder(scene);
  const build = (on: boolean): void => {
    const { below, above } = make(on);
    show(below);
    scene.addLayer(above);
    state.heard = [];
    for (const l of [below, above]) {
      l.on('click', () => {
        state.heard.push(l.name);
        if (out) out.textContent = `click heard by: ${state.heard.join(', ')}`;
      });
    }
  };
  build(true);
  if (stage.bar) {
    toggle(stage.bar, 'enablePropagation on the top layer', true, (on) => {
      build(on);
      if (out) out.textContent = 'click the red circle';
    });
  }

  return () => stage.dispose();
};

export default mount;
