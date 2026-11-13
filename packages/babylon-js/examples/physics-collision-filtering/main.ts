// Membership and collide masks: planks that catch one colour
import { MeshBuilder, PhysicsBody, PhysicsMotionType, PhysicsShapeBox, PhysicsShapeSphere, Quaternion, Vector3 } from '@babylonjs/core';
import type { Mesh } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createPhysicsStage, paint, staticFloor } from '../../shared/physicsStage.ts';

// One bit per category. Balls are members of one colour bit; planks collide with a chosen set.
const RED = 1;
const GREEN = 2;
const BLUE = 4;
const PLANK = 8;
const COLOURS = [
  { bit: RED, hex: '#f7768e' },
  { bit: GREEN, hex: '#9ece6a' },
  { bit: BLUE, hex: '#7dcfff' },
];
const CHOICES = { red: RED, green: GREEN, blue: BLUE, 'red + green': RED | GREEN, all: RED | GREEN | BLUE, none: 0 } as const;
type Choice = keyof typeof CHOICES;

const mount: Mount = async (el, ctx) => {
  const ps = await createPhysicsStage(el, ctx, { camera: { radius: 17, beta: 1.2, target: new Vector3(0, 3.5, 0) } });
  const { scene } = ps;
  staticFloor(scene, 16, 6);

  const planks: { shape: PhysicsShapeBox; x: number }[] = [];
  const defaults: Choice[] = ['red', 'green', 'blue'];
  defaults.forEach((choice, i) => {
    const x = (i - 1) * 4.5;
    const mesh = MeshBuilder.CreateBox('plank', { width: 3.4, height: 0.3, depth: 3 }, scene);
    mesh.position.set(x, 3, 0);
    paint(mesh, COLOURS[i]!.hex, 0.55);
    const shape = new PhysicsShapeBox(Vector3.Zero(), Quaternion.Identity(), new Vector3(3.4, 0.3, 3), scene);
    // A pair collides only if membership & collideMask overlaps in both directions.
    shape.filterMembershipMask = PLANK;
    shape.filterCollideMask = CHOICES[choice];
    const body = new PhysicsBody(mesh, PhysicsMotionType.STATIC, false, scene);
    body.shape = shape;
    planks.push({ shape, x });
  });

  const live: Mesh[] = [];
  let n = 0;
  const spawn = (): void => {
    const c = COLOURS[n++ % 3]!;
    const ball = MeshBuilder.CreateSphere('ball', { diameter: 0.9, segments: 12 }, scene);
    ball.position.set(planks[Math.floor(Math.random() * 3)]!.x + (Math.random() - 0.5) * 2, 8, (Math.random() - 0.5) * 1.5);
    paint(ball, c.hex);
    const body = new PhysicsBody(ball, PhysicsMotionType.DYNAMIC, false, scene);
    const shape = new PhysicsShapeSphere(Vector3.Zero(), 0.45, scene);
    shape.filterMembershipMask = c.bit;
    // The balls collide with everything (the default mask), so only the planks' masks decide.
    body.shape = shape;
    body.setMassProperties({ mass: 1 });
    live.push(ball);
    if (live.length > (ctx.preview ? 14 : 22)) {
      const old = live.shift()!;
      old.physicsBody?.shape?.dispose();
      old.dispose();
    }
  };
  const timer = setInterval(spawn, 350);
  ps.onDispose(() => clearInterval(timer));

  if (!ctx.preview) {
    const panel = createPanel(el);
    planks.forEach((p, i) => {
      panel.select(`Plank ${i + 1} collides with`, Object.keys(CHOICES) as Choice[], defaults[i]!, (v) => (p.shape.filterCollideMask = CHOICES[v]));
    });
    panel.row();
    panel.readout('Balls cycle red, green, blue. A plank only stops balls whose membership bit is in its collide mask.');
  }

  ps.stage.run();
  return () => ps.dispose();
};

export default mount;
