// Light.shadowStrength fades shadows between none and full
import { ShadowType } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, tick } from '../../shared/gfx-kit.ts';
import { shadowProps } from '../../shared/gfx-light.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, light } = await demo(el, ctx, { camera: [4, 5, 8], target: [0, 0.5, 0] });
  const say = caption(stage);
  shadowProps(root, engine);
  light.entity.transform.setRotation(-50, -35, 0);
  light.shadowType = ShadowType.SoftLow;
  const apply = (v: number): void => {
    light.shadowStrength = v;
    say(`shadowStrength = ${v.toFixed(2)}`);
  };
  if (stage.preview) tick(root, (_dt, t) => apply(0.5 + 0.5 * Math.sin(t * 0.9)));
  else {
    apply(1);
    slider(stage.bar, 'shadowStrength', 0, 1, 0.01, 1, apply);
  }
  return stage.dispose;
};

export default mount;
