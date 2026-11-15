// layer.fitBounds(): zoom the map to the extent of one layer
import { type ILayer, PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { cities } from '../../shared/data.ts';
import { PARSER, rows } from '../../shared/layer-demo.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 30], zoom: ctx.preview ? 0.8 : 1.4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const place = (names: string[], color: string, seed: number): ILayer =>
    new PointLayer()
      .source(rows(ctx.preview ? 14 : 30, { around: cities.filter((c) => names.includes(c.name)), seed, spread: 3 }), PARSER)
      .shape('circle')
      .size(ctx.preview ? 5 : 7)
      .color(color);
  const europe = place(['Paris', 'Berlin', 'Madrid', 'Helsinki'], '#4ecdc4', 3);
  const america = place(['New York', 'Chicago', 'Toronto', 'Mexico City'], '#ffd166', 4);
  const asia = place(['Tokyo', 'Seoul', 'Shanghai', 'Manila'], '#ff6b6b', 5);
  for (const l of [europe, america, asia]) scene.addLayer(l);

  if (stage.bar) {
    button(stage.bar, 'europe.fitBounds()', () => europe.fitBounds());
    button(stage.bar, 'america.fitBounds()', () => america.fitBounds());
    button(stage.bar, 'asia.fitBounds()', () => asia.fitBounds());
  } else {
    const order = [europe, america, asia];
    stage.every(1800, (i) => order[i % 3]?.fitBounds());
  }

  return () => stage.dispose();
};

export default mount;
