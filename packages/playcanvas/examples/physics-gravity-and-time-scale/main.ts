// ammo.js physics: gravity, slow motion and pause with timeScale, manual steps
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { loadAmmo } from '../../shared/ammo.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const GRAVITY = { 'Earth (-9.81)': -9.81, 'Moon (-1.62)': -1.62, 'Space (0)': 0 } as const;
type GravityName = keyof typeof GRAVITY;

const mount: Mount = async (el, ctx) => {
  // ammo.js must be present before the application starts.
  await loadAmmo();
  const stage = await createStage(el, ctx);
  const { app } = stage;
  const physics = app.systems.rigidbody!;
  app.scene.ambientLight = new pc.Color(0.25, 0.27, 0.32);

  const camera = new pc.Entity('camera');
  camera.addComponent('camera', { clearColor: new pc.Color(0.07, 0.08, 0.11) });
  app.root.addChild(camera);
  const orbit = createOrbit(app, camera, { distance: 14, pitch: -22, target: new pc.Vec3(0, 2, 0), autoRotate: 8, interactive: !ctx.preview });

  const sun = new pc.Entity('sun');
  sun.addComponent('light', { type: 'directional', castShadows: true, shadowDistance: 30, normalOffsetBias: 0.05 });
  sun.setEulerAngles(55, 25, 0);
  app.root.addChild(sun);

  // A static floor: a box collision 10 x 1 x 10 (halfExtents 5, 0.5, 5) sitting just below y = 0.
  const floor = new pc.Entity('floor');
  floor.addComponent('render', { type: 'box', castShadows: false });
  floor.addComponent('collision', { type: 'box', halfExtents: new pc.Vec3(5, 0.5, 5) });
  floor.addComponent('rigidbody', { type: 'static', restitution: 0.4 });
  floor.setLocalScale(10, 1, 10);
  floor.setPosition(0, -0.5, 0);
  app.root.addChild(floor);

  // Dynamic bodies: one unit is one metre, mass is in kilograms.
  const colours = ['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8', '#a78bfa'];
  const bodies = Array.from({ length: 15 }, (_, i) => {
    const material = new pc.StandardMaterial();
    material.diffuse = new pc.Color().fromString(colours[i % colours.length]!);
    material.update();
    const ball = i % 2 === 0;
    const e = new pc.Entity(`body${i}`);
    e.addComponent('render', { type: ball ? 'sphere' : 'box', material, castShadows: true });
    e.addComponent('collision', ball ? { type: 'sphere', radius: 0.5 } : { type: 'box', halfExtents: new pc.Vec3(0.5, 0.5, 0.5) });
    e.addComponent('rigidbody', { type: 'dynamic', mass: 1, restitution: 0.5, friction: 0.5 });
    app.root.addChild(e);
    return e;
  });

  // Dynamic bodies are moved with teleport, not setPosition: physics owns their transform.
  const drop = (): void => {
    bodies.forEach((e, i) => {
      e.rigidbody!.teleport((i % 5) * 1.1 - 2.2 + Math.random() * 0.2, 4 + Math.floor(i / 5) * 1.6, Math.random() - 0.5);
      e.rigidbody!.linearVelocity = pc.Vec3.ZERO;
      e.rigidbody!.angularVelocity = pc.Vec3.ZERO;
    });
  };
  drop();

  // Cards cycle through the three timeScale behaviours on their own.
  let since = 0;
  let phase = 0;
  if (ctx.preview) {
    app.on('update', (dt: number) => {
      since += dt;
      if (since < 4) return;
      since = 0;
      phase = (phase + 1) % 3;
      physics.timeScale = [1, 0.25, 1][phase]!;
      physics.gravity = new pc.Vec3(0, [-9.81, -9.81, -1.62][phase]!, 0);
      drop();
    });
  }

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select<GravityName>('gravity', Object.keys(GRAVITY) as GravityName[], 'Earth (-9.81)', (name) => {
      physics.gravity = new pc.Vec3(0, GRAVITY[name], 0);
    });
    const scale = panel.slider('timeScale', 0, 2, 0.05, 1, (v) => (physics.timeScale = v));
    panel.row();
    panel.button('Drop again', drop);
    // step(dt) advances immediately; with timeScale 0 it is the only thing that moves physics.
    panel.button('Pause and step 1/60 s', () => {
      physics.timeScale = 0;
      scale.value = '0';
      scale.dispatchEvent(new Event('input'));
      physics.step(1 / 60);
    });
  }

  return () => {
    orbit.dispose();
    stage.dispose();
  };
};

export default mount;
