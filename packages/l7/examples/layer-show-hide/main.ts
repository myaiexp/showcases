// layer.show(), layer.hide() and layer.isVisible() on two layers
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { PARSER, grid } from '../../shared/layer-demo.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.6 }),
  });
  await stage.ready(scene);

  const cols = ctx.preview ? 4 : 6;
  const reds = new PointLayer({ name: 'reds' })
    .source(grid(cols, 3, [10, 48]), PARSER)
    .shape('circle')
    .size(ctx.preview ? 12 : 16)
    .color('#ff6b6b');
  const blues = new PointLayer({ name: 'blues', visible: true })
    .source(grid(cols, 3, [10, 44], 4, 9), PARSER)
    .shape('triangle')
    .size(ctx.preview ? 12 : 16)
    .color('#7fb7ff');
  scene.addLayer(reds);
  scene.addLayer(blues);

  const out = stage.readout();
  const report = (what: string): void => {
    if (out) out.textContent = `${what}\nreds.isVisible() = ${reds.isVisible()}\nblues.isVisible() = ${blues.isVisible()}`;
  };
  if (stage.bar) {
    button(stage.bar, 'reds.hide()', () => (reds.hide(), report('reds.hide()')));
    button(stage.bar, 'reds.show()', () => (reds.show(), report('reds.show()')));
    button(stage.bar, 'blues.hide()', () => (blues.hide(), report('blues.hide()')));
    button(stage.bar, 'blues.show()', () => (blues.show(), report('blues.show()')));
    report('both layers start visible');
  } else {
    // Cards: the layers take turns disappearing.
    stage.every(900, (i) => {
      const [first, second] = i % 2 ? [reds, blues] : [blues, reds];
      first.hide();
      second.show();
    });
  }

  return () => stage.dispose();
};

export default mount;
