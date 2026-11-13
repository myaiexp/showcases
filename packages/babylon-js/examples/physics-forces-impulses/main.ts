// applyForce each frame versus one applyImpulse: two spheres, the same push
import { MeshBuilder, PhysicsBody, PhysicsMotionType, PhysicsShapeSphere, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createPhysicsStage, paint, staticFloor } from '../../shared/physicsStage.ts';

const mount: Mount = async (el, ctx) => {
  const ps = await createPhysicsStage(el, ctx, { camera: { radius: 15, beta: 1.2, target: new Vector3(0, 3, 0) } });
  const { scene } = ps;
  staticFloor(scene, 14, 8);

  const shape = new PhysicsShapeSphere(Vector3.Zero(), 0.5, scene);
  const make = (name: string, x: number, color: string): { mesh: ReturnType<typeof MeshBuilder.CreateSphere>; body: PhysicsBody } => {
    const mesh = MeshBuilder.CreateSphere(name, { diameter: 1, segments: 16 }, scene);
    mesh.position.set(x, 0.5, 0);
    paint(mesh, color);
    const body = new PhysicsBody(mesh, PhysicsMotionType.DYNAMIC, false, scene);
    body.shape = shape;
    body.setMassProperties({ mass: 1 });
    return { mesh, body };
  };
  const forced = make('force', -2.5, '#e0af68');
  const impulsed = make('impulse', 2.5, '#7dcfff');

  let force = 30;
  let burn = 0.4;
  let burnLeft = 0;
  const peaks = { force: 0, impulse: 0 };
  let readout: HTMLElement | undefined;

  // The force is continuous: applied every frame it adds up to force * time.
  // The impulse is instantaneous: the same total momentum delivered at once.
  const fire = (): void => {
    burnLeft = burn;
    peaks.force = 0;
    peaks.impulse = 0;
    impulsed.body.applyImpulse(new Vector3(0, force * burn, 0), impulsed.mesh.absolutePosition);
  };
  fire();
  const timer = setInterval(fire, 3400);
  ps.onDispose(() => clearInterval(timer));

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('Force (N)', 5, 60, 1, force, (v) => (force = v));
    panel.slider('Burn time (s)', 0.1, 1, 0.05, burn, (v) => (burn = v));
    panel.button('Fire both', fire);
    panel.row();
    readout = panel.readout();
  }

  ps.stage.run(() => {
    const dt = ps.stage.engine.getDeltaTime() / 1000;
    if (burnLeft > 0) {
      forced.body.applyForce(new Vector3(0, force, 0), forced.mesh.absolutePosition);
      burnLeft -= dt;
    }
    peaks.force = Math.max(peaks.force, forced.mesh.position.y);
    peaks.impulse = Math.max(peaks.impulse, impulsed.mesh.position.y);
    if (readout) readout.textContent = `Peak height: force ${peaks.force.toFixed(1)} (gravity works during the burn), impulse ${peaks.impulse.toFixed(1)}`;
  });
  return () => ps.dispose();
};

export default mount;
