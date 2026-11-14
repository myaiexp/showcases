// 2D blend trees, Cartesian and Directional, driven by a pad and two floats
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { creatureScene, idleClip, leanClip } from '../../shared/animation.ts';
import { createPanel } from '../../shared/panel.ts';
import { createPad } from './pad.ts';

type Kind = 'directional' | 'cartesian';
const TYPES: Record<Kind, string> = { directional: pc.ANIM_BLEND_2D_DIRECTIONAL, cartesian: pc.ANIM_BLEND_2D_CARTESIAN };

// Points are positions on the plane of the two parameters; Idle sits at the origin.
const CHILDREN = [
  { name: 'Idle', point: [0, 0] },
  { name: 'Forward', point: [0, 1] },
  { name: 'Back', point: [0, -1] },
  { name: 'Left', point: [-1, 0] },
  { name: 'Right', point: [1, 0] },
];

const makeGraph = (kind: Kind): object => ({
  layers: [
    {
      name: 'Base',
      states: [
        { name: 'START' },
        { name: 'Lean', loop: true, blendTree: { type: TYPES[kind], parameters: ['moveX', 'moveZ'], children: CHILDREN } },
      ],
      transitions: [{ from: 'START', to: 'Lean' }],
    },
  ],
  parameters: {
    moveX: { name: 'moveX', type: pc.ANIM_PARAMETER_FLOAT, value: 0 },
    moveZ: { name: 'moveZ', type: pc.ANIM_PARAMETER_FLOAT, value: 0 },
  },
});

const mount: Mount = async (el, ctx) => {
  const { scene, creature } = await creatureScene(el, ctx, { distance: 6 });
  const { app } = scene;
  const anim = creature.anim!;
  const tracks: Record<string, pc.AnimTrack> = {
    Idle: idleClip(),
    Forward: leanClip('Forward', 0, 1),
    Back: leanClip('Back', 0, -1),
    Left: leanClip('Left', -1, 0),
    Right: leanClip('Right', 1, 0),
  };

  let at = { x: 0, y: 0 };
  const load = (kind: Kind): void => {
    anim.loadStateGraph(makeGraph(kind));
    for (const [name, track] of Object.entries(tracks)) anim.baseLayer!.assignAnimation(`Lean.${name}`, track);
    anim.setFloat('moveX', at.x);
    anim.setFloat('moveZ', at.y);
  };
  const aim = (x: number, y: number): void => {
    at = { x, y };
    anim.setFloat('moveX', x);
    anim.setFloat('moveZ', y);
  };
  load('directional');

  if (ctx.preview) {
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      aim(Math.cos(t * 1.1) * 0.9 * Math.min(1, t / 2), Math.sin(t * 1.1) * 0.9 * Math.min(1, t / 2));
    });
  } else {
    const panel = createPanel(el);
    const pad = createPad(
      panel.el,
      CHILDREN.map((c) => ({ label: c.name, x: c.point[0]!, y: c.point[1]! })),
      aim,
    );
    panel.select('blend tree type', ['directional', 'cartesian'] as const, 'directional', load);
    panel.readout('Drag on the pad: the two coordinates are the moveX and moveZ parameters.');
    app.on('update', () => pad.set(at.x, at.y));
    return () => {
      pad.dispose();
      scene.dispose();
    };
  }
  return () => scene.dispose();
};

export default mount;
