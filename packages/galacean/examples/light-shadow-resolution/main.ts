// scene.shadowResolution: Low 512, Medium 1024, High 2048, VeryHigh 4096
import { ShadowResolution, ShadowType } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, steps } from '../../shared/gfx-kit.ts';
import { shadowProps } from '../../shared/gfx-light.ts';
import { select } from '../../shared/controls.ts';

const NAMES = ['Low', 'Medium', 'High', 'VeryHigh'] as const;
const TEXELS = [512, 1024, 2048, 4096];

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, light } = await demo(el, ctx, { camera: [3, 3.5, 6], target: [0, 0.6, 0] });
  const say = caption(stage);
  shadowProps(root, engine, { size: 40 });
  light.entity.transform.setRotation(-40, -35, 0);
  light.shadowType = ShadowType.Hard;
  stage.scene.shadowDistance = 60;
  const apply = (n: (typeof NAMES)[number]): void => {
    stage.scene.shadowResolution = ShadowResolution[n];
    say(`shadowResolution = ${n} (${TEXELS[NAMES.indexOf(n)]})`);
  };
  if (stage.preview) steps(root, 2, NAMES.length, (i) => apply(NAMES[i]!));
  else {
    apply('Medium');
    select(stage.bar, 'shadowResolution', NAMES, apply, 'Medium');
  }
  return stage.dispose;
};

export default mount;
