// A 1D blend tree that mixes idle, walk and run by one speed parameter
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { creatureScene, idleClip, locomotion } from '../../shared/animation.ts';
import { createPanel } from '../../shared/panel.ts';

const POINTS = { Idle: 0, Walk: 1, Run: 3 };

// syncAnimations false lets each child play at its own speed instead of a shared one.
const makeGraph = (sync: boolean): object => ({
  layers: [
    {
      name: 'Base',
      states: [
        { name: 'START' },
        {
          name: 'Movement',
          loop: true,
          blendTree: {
            type: pc.ANIM_BLEND_1D,
            parameter: 'speed',
            syncAnimations: sync,
            children: Object.entries(POINTS).map(([name, point]) => ({ name, point })),
          },
        },
      ],
      transitions: [{ from: 'START', to: 'Movement' }],
    },
  ],
  parameters: { speed: { name: 'speed', type: pc.ANIM_PARAMETER_FLOAT, value: 0 } },
});

const mount: Mount = async (el, ctx) => {
  const { scene, creature } = await creatureScene(el, ctx);
  const { app } = scene;
  const anim = creature.anim!;
  const tracks = { Idle: idleClip(), Walk: locomotion('Walk', 1, 1), Run: locomotion('Run', 0.6, 1.6) };

  let speed = 0;
  const load = (sync: boolean): void => {
    anim.loadStateGraph(makeGraph(sync));
    // A child's clip is linked by 'state.child'.
    for (const [name, track] of Object.entries(tracks)) anim.baseLayer!.assignAnimation(`Movement.${name}`, track);
    anim.setFloat('speed', speed);
  };
  load(true);

  if (ctx.preview) {
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      speed = 1.5 + Math.sin(t * 0.8) * 1.5;
      anim.setFloat('speed', speed);
    });
  } else {
    const panel = createPanel(el);
    // Keep the value between the lowest and highest point: outside them no child has any weight.
    panel.slider('speed (points 0, 1 and 3)', 0, 3, 0.05, 0, (v) => {
      speed = v;
      anim.setFloat('speed', v);
    });
    panel.check('syncAnimations', true, (on) => load(on));
    panel.row();
    const info = panel.readout();
    app.on('update', () => {
      // Between two points the two neighbours are mixed in proportion.
      const pts = Object.values(POINTS);
      const w = pts.map(() => 0);
      for (let i = 0; i < pts.length - 1; i++) {
        if (speed >= pts[i]! && speed <= pts[i + 1]!) {
          const f = (speed - pts[i]!) / (pts[i + 1]! - pts[i]!);
          w[i] = 1 - f;
          w[i + 1] = f;
          break;
        }
      }
      info.textContent = `speed ${speed.toFixed(2)} | weights ${Object.keys(POINTS).map((n, i) => `${n} ${w[i]!.toFixed(2)}`).join(', ')}`;
    });
  }
  return () => scene.dispose();
};

export default mount;
