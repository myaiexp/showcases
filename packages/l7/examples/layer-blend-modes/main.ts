// new PointLayer({ blend }) on four pairs of overlapping layers, one pair per blend mode
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['normal', 'additive', 'subtractive', 'max'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [0, 0], zoom: ctx.preview ? 2.5 : 3.6 }),
  });
  await stage.ready(scene);

  const gap = ctx.preview ? 7 : 8;
  const r = ctx.preview ? 16 : 34;
  MODES.forEach((mode, i) => {
    const lng = (i - 1.5) * gap;
    const one = (dx: number): { lng: number; lat: number }[] => [{ lng: lng + dx, lat: 0 }];
    const parser = { parser: { type: 'json', x: 'lng', y: 'lat' } } as const;
    // The first layer is plain; the second one is blended onto it.
    scene.addLayer(new PointLayer().source(one(-0.9), parser).shape('circle').size(r).color('#2a6bff'));
    scene.addLayer(new PointLayer({ blend: mode }).source(one(0.9), parser).shape('circle').size(r).color('#ff8a1f'));
    scene.addLayer(
      new PointLayer()
        .source([{ lng, lat: -4.5, name: mode }], { parser: { type: 'json', x: 'lng', y: 'lat' } })
        .shape('name', 'text')
        .size(ctx.preview ? 11 : 14)
        .color('#cfe3f7'),
    );
  });

  if (stage.preview) stage.every(80, (i) => scene.setCenter([Math.sin(i / 30) * 2, 0]));

  return () => stage.dispose();
};

export default mount;
