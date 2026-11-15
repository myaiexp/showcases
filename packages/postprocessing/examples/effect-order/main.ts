// Effects in one EffectPass apply in the order given: hue shift then sepia, or the reverse
import { EffectComposer, EffectPass, HueSaturationEffect, RenderPass, SepiaEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const hue = (): HueSaturationEffect => new HueSaturationEffect({ hue: Math.PI * 0.6, saturation: 0.4 });
  const sepia = (): SepiaEffect => new SepiaEffect({ intensity: 1 });

  // Both effects have no attributes, so the EffectPass keeps them in argument order.
  // Sepia last replaces every hue with its brown tint; hue last turns the sepia blue-green.
  const build = (...order: [HueSaturationEffect, SepiaEffect] | [SepiaEffect, HueSaturationEffect]): EffectComposer => {
    const composer = stage.own(new EffectComposer(stage.renderer));
    composer.addPass(new RenderPass(stage.scene, stage.camera));
    composer.addPass(new EffectPass(stage.camera, ...order));
    return composer;
  };
  const orders = {
    'hue/saturation, then sepia': build(hue(), sepia()),
    'sepia, then hue/saturation': build(sepia(), hue()),
  };
  type Order = keyof typeof orders;
  const names = Object.keys(orders) as Order[];
  let order = names[0]!;
  const label = overlay(stage.box, order);
  const show = (o: Order): void => {
    order = o;
    label.textContent = `new EffectPass(camera, ${o === names[0] ? 'hue, sepia' : 'sepia, hue'})`;
  };
  show(order);

  if (stage.bar) select(stage.bar, 'order', names, show, order);
  else stage.every(2500, () => show(order === names[0] ? names[1]! : names[0]!));

  stage.run((dt, t) => {
    subject.update(t);
    orders[order].render(dt);
  });
  return () => stage.dispose();
};

export default mount;
