// Renderer.castShadows decides who throws shadows, receiveShadows who shows them
import { PrimitiveMesh, ShadowType } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, caption, demo, floor, spin, steps } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, light } = await demo(el, ctx, { camera: [3, 5, 7], target: [0, 0.5, 0] });
  const say = caption(stage);
  const ground = floor(root, engine, 0, 14, blinn(engine, [0.7, 0.7, 0.75], 6));
  ground.castShadows = false;
  const ball = add(root, PrimitiveMesh.createSphere(engine, 0.8), blinn(engine, [0.9, 0.5, 0.35], 40), [-1, 3, 0], 'caster').renderer;
  const box = add(root, PrimitiveMesh.createCuboid(engine, 1.6, 1.6, 1.6), blinn(engine, [0.4, 0.65, 0.9], 40), [-1, 0.8, 0], 'box').renderer;
  spin(box.entity, [0, 20, 0]);
  light.entity.transform.setRotation(-60, -40, 0);
  light.shadowType = ShadowType.SoftLow;
  const apply = (cast: boolean, boxReceives: boolean, floorReceives: boolean): void => {
    ball.castShadows = cast;
    box.receiveShadows = boxReceives;
    ground.receiveShadows = floorReceives;
    say(`sphere cast ${cast}  cube receive ${boxReceives}  floor receive ${floorReceives}`);
  };
  const states: [boolean, boolean, boolean][] = [[true, true, true], [false, true, true], [true, false, true], [true, true, false]];
  if (stage.preview) steps(root, 2.2, states.length, (i) => apply(...states[i]!));
  else {
    const s = { cast: true, box: true, floor: true };
    const go = (): void => apply(s.cast, s.box, s.floor);
    go();
    checkbox(stage.bar, 'sphere castShadows', true, (v) => ((s.cast = v), go()));
    checkbox(stage.bar, 'cube receiveShadows', true, (v) => ((s.box = v), go()));
    checkbox(stage.bar, 'floor receiveShadows', true, (v) => ((s.floor = v), go()));
  }
  return stage.dispose;
};

export default mount;
