// Particles drawn as a mesh instead of billboards, lit by the scene
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { sun: { angles: [45, 30, 0], intensity: 1.3 }, orbit: { distance: 9, pitch: -15, autoRotate: 14 } });
  const { app } = scene;

  // The component takes a mesh directly (the docs' Model Asset and Render Asset fields supply one from an asset).
  const geometries: Record<string, () => pc.Geometry> = {
    box: () => new pc.BoxGeometry(),
    sphere: () => new pc.SphereGeometry({ latitudeBands: 8, longitudeBands: 8 }),
    cone: () => new pc.ConeGeometry(),
  };
  const meshes = Object.fromEntries(Object.entries(geometries).map(([k, make]) => [k, pc.Mesh.fromGeometry(scene.stage.device, make())]));

  const emitter = new pc.Entity('emitter');
  emitter.setPosition(0, -2.4, 0);
  emitter.addComponent('particlesystem', {
    numParticles: 80,
    lifetime: 3.2,
    rate: 0.04,
    rate2: 0.04,
    mesh: meshes.box,
    emitterShape: pc.EMITTERSHAPE_SPHERE,
    emitterRadius: 0.4,
    lighting: true,
    scaleGraph: new pc.Curve([0, 0.4, 1, 0.2]),
    rotationSpeedGraph: new pc.Curve([0, 200]),
    colorGraph: new pc.CurveSet([[0, 1, 1, 0.3], [0, 0.6, 1, 0.8], [0, 0.2, 1, 1]]),
    alphaGraph: new pc.Curve([0, 1]),
    localVelocityGraph: new pc.CurveSet([[0, -1, 1, 1], [0, 3.4, 1, 1], [0, 0]]),
    localVelocityGraph2: new pc.CurveSet([[0, 1, 1, -1], [0, 4.4, 1, 2], [0, 0]]),
  });
  app.root.addChild(emitter);
  const ps = emitter.particlesystem!;

  if (ctx.preview) {
    let t = 0;
    let last = '';
    app.on('update', (dt: number) => {
      t += dt;
      const name = Object.keys(meshes)[Math.floor(t / 3) % 3]!;
      if (name !== last) ps.mesh = meshes[(last = name)]!;
    });
  } else {
    const panel = createPanel(el);
    panel.select('mesh', Object.keys(meshes), 'box', (v) => (ps.mesh = meshes[v]!));
    panel.check('lighting', true, (on) => (ps.lighting = on));
  }

  return () => {
    scene.dispose();
    Object.values(meshes).forEach((m) => m.destroy());
  };
};

export default mount;
