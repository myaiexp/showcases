// fontWeight and fontFamily: any CSS font on the label atlas
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cities, cityFeatures } from '../../shared/data.ts';
import { cycle, holder } from '../../shared/point-data.ts';
import { select } from '../../shared/controls.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 50], zoom: ctx.preview ? 2.4 : 3.2 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  const spots = cityFeatures(cities.filter((c) => c.continent === 'Europe'));
  const show = holder(scene);
  const draw = (fontFamily: string, fontWeight: string): void => {
    show(
      new PointLayer()
        .source(spots)
        .shape('name', 'text')
        .size(14)
        .color('#ffd166')
        .style({ fontFamily, fontWeight, stroke: '#0b131c', strokeWidth: 1 }),
    );
  };

  const families = ['sans-serif', 'serif', 'monospace', 'Times New Roman'];
  const weights = ['400', '700', '900'];
  if (stage.bar) {
    let family = 'sans-serif';
    let weight = '400';
    draw(family, weight);
    select(stage.bar, 'fontFamily', families, family, (v) => draw((family = v), weight));
    select(stage.bar, 'fontWeight', weights, weight, (v) => draw(family, (weight = v)));
  } else {
    cycle(stage, scene, [['sans-serif', '400'], ['serif', '700'], ['monospace', '400'], ['serif', '900']] as const, 1200, ([f, w]) => draw(f, w));
  }

  return () => stage.dispose();
};

export default mount;
