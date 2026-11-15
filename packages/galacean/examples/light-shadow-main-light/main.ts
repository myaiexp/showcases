// scene.sun picks the one directional light that casts shadows
import { DirectLight, ShadowType } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, steps } from '../../shared/gfx-kit.ts';
import { shadowProps } from '../../shared/gfx-light.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, light: warm } = await demo(el, ctx, { camera: [0, 7, 8], target: [0, 0.4, 0] });
  const say = caption(stage);
  shadowProps(root, engine);
  warm.entity.transform.setRotation(-45, 50, 0);
  warm.color.set(1, 0.65, 0.4, 1);
  const coolEntity = root.createChild('cool light');
  coolEntity.transform.setRotation(-45, -50, 0);
  const cool = coolEntity.addComponent(DirectLight);
  cool.color.set(0.45, 0.65, 1, 1);
  warm.shadowType = cool.shadowType = ShadowType.SoftLow;
  const apply = (useWarm: boolean): void => {
    stage.scene.sun = useWarm ? warm : cool;
    say(`scene.sun = the ${useWarm ? 'warm' : 'cool'} light`);
  };
  if (stage.preview) steps(root, 2.5, 2, (i) => apply(i === 0));
  else {
    let useWarm = true;
    apply(useWarm);
    button(stage.bar, 'Switch scene.sun', () => apply((useWarm = !useWarm)));
  }
  return stage.dispose;
};

export default mount;
