// Light.cullingMask works with the entity layer: only matching objects are lit
import { DirectLight, Layer, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, caption, demo, floor, spin, steps } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';

const MASKS = { Layer0: Layer.Layer0, Layer1: Layer.Layer1, Everything: Layer.Everything } as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, light } = await demo(el, ctx, { camera: [0, 3, 7], target: [0, 0.3, 0] });
  const say = caption(stage);
  floor(root, engine, -1);
  const lamp = root.createChild('layer-0 fill');
  lamp.transform.setRotation(-60, 120, 0);
  const fill = lamp.addComponent(DirectLight);
  fill.color.set(0.05, 0.06, 0.1, 1);
  fill.cullingMask = Layer.Layer0;
  const left = add(root, PrimitiveMesh.createSphere(engine, 1), blinn(engine, [0.9, 0.5, 0.4], 50), [-2, 0, 0], 'Layer0 sphere');
  const right = add(root, PrimitiveMesh.createSphere(engine, 1), blinn(engine, [0.4, 0.6, 0.9], 50), [2, 0, 0], 'Layer1 sphere');
  right.entity.layer = Layer.Layer1;
  spin(left.entity, [0, 30, 0]);
  const names = Object.keys(MASKS) as (keyof typeof MASKS)[];
  const apply = (n: keyof typeof MASKS): void => {
    light.cullingMask = MASKS[n];
    say(`sun.cullingMask = Layer.${n}`);
  };
  if (stage.preview) steps(root, 2.2, names.length, (i) => apply(names[i]!));
  else {
    apply('Everything');
    select(stage.bar, 'sun cullingMask', names, apply, 'Everything');
  }
  return stage.dispose;
};

export default mount;
