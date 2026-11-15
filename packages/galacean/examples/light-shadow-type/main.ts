// Light.shadowType: None, Hard, SoftLow, SoftHigh
import { ShadowResolution, ShadowType } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, steps } from '../../shared/gfx-kit.ts';
import { shadowProps } from '../../shared/gfx-light.ts';
import { select } from '../../shared/controls.ts';

const TYPES = ['None', 'Hard', 'SoftLow', 'SoftHigh'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, light } = await demo(el, ctx, { camera: [4, 5, 8], target: [0, 0.5, 0] });
  const say = caption(stage);
  shadowProps(root, engine);
  light.entity.transform.setRotation(-50, -35, 0);
  stage.scene.shadowResolution = ShadowResolution.Medium;
  const apply = (t: (typeof TYPES)[number]): void => {
    light.shadowType = ShadowType[t];
    say(`shadowType = ShadowType.${t}`);
  };
  if (stage.preview) steps(root, 2, TYPES.length, (i) => apply(TYPES[i]!));
  else {
    apply('SoftLow');
    select(stage.bar, 'shadowType', TYPES, apply, 'SoftLow');
  }
  return stage.dispose;
};

export default mount;
