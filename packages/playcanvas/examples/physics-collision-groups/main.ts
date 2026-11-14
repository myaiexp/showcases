// Two ball pens: one group ignores its own members through the body mask
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, createPhysicsScene, every, PALETTE, respawn } from '../../shared/physics.ts';

const COUNT = 16;
const PEN = 3.4;

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 17, pitch: -32, target: [0, 1.5, 0], floor: 16, yaw: 15 });
  const { app } = scene;

  const pen = (cx: number): void => {
    for (const [x, z, w, d] of [[0, PEN / 2, PEN + 0.3, 0.3], [0, -PEN / 2, PEN + 0.3, 0.3], [PEN / 2, 0, 0.3, PEN], [-PEN / 2, 0, 0.3, PEN]] as const) {
      addBody(app, { type: 'static', name: 'wall', size: [w, 3.2, d], position: [cx + x, 1.6, z], colour: '#59627a' });
    }
  };
  pen(-4.5);
  pen(4.5);

  const make = (cx: number, colour: string): pc.Entity[] =>
    Array.from({ length: COUNT }, (_, i) => {
      const b = addBody(app, { shape: 'sphere', name: `ball ${cx}`, size: 0.6, colour: i % 2 ? colour : PALETTE[(i + 2) % 6], body: { mass: 1, restitution: 0.2 } });
      respawn(b, [cx, 20 + i, 0]);
      return b;
    });
  const left = make(-4.5, '#e8794a');
  const right = make(4.5, '#4ab3e8');

  // Set after the type (it is dynamic from the start): group, then the mask of groups it collides with.
  const setMask = (ignoreOwnGroup: boolean): void => {
    for (const b of left) {
      b.rigidbody!.group = pc.BODYGROUP_USER_1;
      b.rigidbody!.mask = ignoreOwnGroup ? pc.BODYMASK_ALL ^ pc.BODYGROUP_USER_1 : pc.BODYMASK_ALL;
    }
  };
  setMask(true);

  // A ball every quarter second, recycled round robin from the top.
  let next = 0;
  every(app, 0.25, () => {
    const i = next++ % COUNT;
    const jitter = (): number => (Math.random() - 0.5) * 1.6;
    respawn(left[i]!, [-4.5 + jitter(), 6, jitter()]);
    respawn(right[i]!, [4.5 + jitter(), 6, jitter()]);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('left pen: mask = BODYMASK_ALL ^ BODYGROUP_USER_1', true, setMask);
    panel.row();
    panel.readout('left: balls ignore their own group    right: default mask, balls collide');
  }

  return () => scene.dispose();
};

export default mount;
