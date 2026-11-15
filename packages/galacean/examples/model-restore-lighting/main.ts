// Same model, four lighting setups: default scene, direct light, image-based ambient, both
import { Animator } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { loadStudioEnv } from '../../shared/env.ts';
import { select } from '../../shared/controls.ts';
import { steps, tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, rig } from '../../shared/model-kit.ts';

const SETUPS = ['default: no light', 'direct light only', 'ambient env only', 'direct + env'] as const;

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb, { env: false });
  if (!r) return NOOP;
  const { stage, engine, model, light, say } = r;
  const plain = stage.scene.ambientLight;
  const env = await loadStudioEnv(engine);
  if (ctx.signal.aborted) {
    stage.dispose();
    return NOOP;
  }
  model.getComponent(Animator)!.play('Idle');
  const apply = (name: (typeof SETUPS)[number]): void => {
    light.entity.isActive = name === 'direct light only' || name === 'direct + env';
    stage.scene.ambientLight = name === 'ambient env only' || name === 'direct + env' ? env : plain;
    say(`${name}\nscene.ambientLight ${stage.scene.ambientLight === env ? 'EnvLoader .env' : 'default solid colour'}, DirectLight ${light.entity.isActive ? 'on' : 'off'}`);
  };
  apply(SETUPS[0]);
  if (stage.preview) steps(model, 2, SETUPS.length, (i) => apply(SETUPS[i]!));
  else select(stage.bar, 'lighting', SETUPS, apply);
  tick(model, (dt) => model.transform.rotate(0, 20 * dt, 0));
  return stage.dispose;
};

export default mount;
