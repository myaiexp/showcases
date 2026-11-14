// The five primitive collision shapes, and the axis of capsule, cylinder, cone
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { createPhysicsScene, every, PALETTE, respawn } from '../../shared/physics.ts';

type Kind = 'box' | 'sphere' | 'capsule' | 'cylinder' | 'cone';
const KINDS: Kind[] = ['box', 'sphere', 'capsule', 'cylinder', 'cone'];
const HAS_AXIS: Kind[] = ['capsule', 'cylinder', 'cone'];
const HEIGHT = 1.4;

// The render primitives are Y-aligned, so the visible child turns to follow the collision axis.
const AXIS_ROTATION: [number, number, number][] = [[0, 0, -90], [0, 0, 0], [90, 0, 0]];

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 15, target: [0, 1, 0], floor: 14, yaw: 20 });
  const { app } = scene;

  const bodies = KINDS.map((kind, i) => {
    const e = new pc.Entity(kind);
    const shape: Record<string, unknown> = {
      box: { type: 'box', halfExtents: new pc.Vec3(0.55, 0.55, 0.55) },
      sphere: { type: 'sphere', radius: 0.6 },
      capsule: { type: 'capsule', radius: 0.5, height: 2, axis: 1 },
      cylinder: { type: 'cylinder', radius: 0.5, height: HEIGHT, axis: 1 },
      cone: { type: 'cone', radius: 0.5, height: HEIGHT, axis: 1 },
    }[kind]!;
    e.addComponent('collision', shape);
    e.addComponent('rigidbody', { type: 'dynamic', mass: 1, friction: 0.6, restitution: 0.2 });
    const visual = new pc.Entity('visual');
    visual.addComponent('render', { type: kind, material: material(PALETTE[i]!), castShadows: true });
    // Collision shapes ignore scale; the render scale is only sized to match them.
    visual.setLocalScale(...({ box: [1.1, 1.1, 1.1], sphere: [1.2, 1.2, 1.2], capsule: [1, 1, 1], cylinder: [1, HEIGHT, 1], cone: [1, HEIGHT, 1] }[kind] as [number, number, number]));
    e.addChild(visual);
    app.root.addChild(e);
    return { kind, e, visual };
  });

  const drop = (): void => bodies.forEach((b, i) => respawn(b.e, [(i - 2) * 2.2, 4 + (i % 2), 0], [Math.random() * 60, Math.random() * 90, Math.random() * 60]));
  drop();
  every(app, 5, drop);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('axis (capsule, cylinder, cone)', ['0 (X)', '1 (Y)', '2 (Z)'], '1 (Y)', (v) => {
      const axis = Number(v[0]);
      for (const b of bodies) {
        if (!HAS_AXIS.includes(b.kind)) continue;
        b.e.collision!.axis = axis;
        b.visual.setLocalEulerAngles(...AXIS_ROTATION[axis]!);
      }
      drop();
    });
    panel.button('Drop again', drop);
  }

  return () => scene.dispose();
};

export default mount;
