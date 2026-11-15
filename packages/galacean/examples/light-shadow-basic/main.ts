// A directional light with shadowType, scene.castShadows and per-renderer cast/receive flags
import { ShadowType } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, tick } from '../../shared/gfx-kit.ts';
import { shadowProps } from '../../shared/gfx-light.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, light } = await demo(el, ctx, { camera: [4, 6, 9], target: [0, 0.6, 0] });
  const say = caption(stage);
  const props = shadowProps(root, engine);
  light.shadowType = ShadowType.SoftLow;
  stage.scene.castShadows = true;
  let manual = false;
  tick(light.entity, (_dt, t) => {
    if (!manual) light.entity.transform.setRotation(-45, t * 35, 0);
    say(`scene.castShadows = ${stage.scene.castShadows}  shadowType = ${ShadowType[light.shadowType]}`);
  });
  if (!stage.preview) {
    checkbox(stage.bar, 'scene.castShadows', true, (v) => (stage.scene.castShadows = v));
    checkbox(stage.bar, 'floor receiveShadows', true, (v) => (props.floor.receiveShadows = v));
    checkbox(stage.bar, 'shapes castShadows', true, (v) => props.items.forEach((r) => (r.castShadows = v)));
    checkbox(stage.bar, 'light turns', true, (v) => (manual = !v));
  }
  return stage.dispose;
};

export default mount;
