// shadowBias, shadowNormalBias and shadowNearPlane against shadow acne and peter-panning
import { PrimitiveMesh, ShadowType } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, caption, demo, floor, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, light } = await demo(el, ctx, { camera: [3, 3, 6], target: [0, 0.5, 0] });
  const say = caption(stage);
  floor(root, engine, 0, 16, blinn(engine, [0.7, 0.7, 0.75], 6));
  add(root, PrimitiveMesh.createCuboid(engine, 1.4, 1.4, 1.4), blinn(engine, [0.9, 0.5, 0.35], 30), [0, 0.7, 0]);
  add(root, PrimitiveMesh.createSphere(engine, 0.7), blinn(engine, [0.4, 0.65, 0.9], 30), [2.2, 0.7, 0.5]);
  light.entity.transform.setRotation(-18, -40, 0);
  light.shadowType = ShadowType.Hard;
  const state = { bias: 0.005, normal: 0, near: 0.1 };
  const apply = (): void => {
    light.shadowBias = state.bias;
    light.shadowNormalBias = state.normal;
    light.shadowNearPlane = state.near;
    say(`shadowBias ${state.bias.toFixed(3)}  normalBias ${state.normal.toFixed(2)}  nearPlane ${state.near.toFixed(1)}`);
  };
  if (stage.preview) {
    tick(root, (_dt, t) => {
      state.bias = 0.0 + 0.9 * (0.5 + 0.5 * Math.sin(t * 0.6));
      apply();
    });
  } else {
    apply();
    slider(stage.bar, 'shadowBias', 0, 2, 0.001, state.bias, (v) => ((state.bias = v), apply()));
    slider(stage.bar, 'shadowNormalBias', 0, 3, 0.01, state.normal, (v) => ((state.normal = v), apply()));
    slider(stage.bar, 'shadowNearPlane', 0.1, 10, 0.1, state.near, (v) => ((state.near = v), apply()));
  }
  return stage.dispose;
};

export default mount;
