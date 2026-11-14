// Particle depthSoftening: soft edges where particles meet geometry, via a depth grab pass
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { sun: { angles: [50, 20, 0] }, orbit: { distance: 7, pitch: -14, autoRotate: 12 }, floor: 14, clear: '#2a2f3d' });
  const { app, camera } = scene;
  addShape(app.root, 'box', material('#4ab3e8'), [-1.6, 0.9, 0], [0.6, 1.8, 3]);
  addShape(app.root, 'cylinder', material('#e8794a'), [1.8, 0.9, 0.5], [1, 1.8, 1]);

  // Soft particles compare their depth with the scene's, so the camera must render a depth map.
  camera.camera!.requestSceneDepthMap(true);

  const smoke = new pc.Entity('smoke');
  smoke.setPosition(0, 0.55, 0);
  smoke.addComponent('particlesystem', {
    numParticles: 70,
    lifetime: 4,
    rate: 0.06,
    rate2: 0.06,
    emitterShape: pc.EMITTERSHAPE_BOX,
    emitterExtents: new pc.Vec3(3, 0.15, 1.4),
    initialVelocity: 0,
    blendType: pc.BLEND_NORMAL,
    depthWrite: false,
    depthSoftening: 1,
    scaleGraph: new pc.Curve([0, 1.8, 1, 2.6]),
    alphaGraph: new pc.Curve([0, 0, 0.2, 0.7, 0.8, 0.7, 1, 0]),
    colorGraph: new pc.CurveSet([[0, 0.85], [0, 0.88], [0, 0.95]]),
    localVelocityGraph: new pc.CurveSet([[0, 0], [0, 0.25], [0, 0]]),
  });
  app.root.addChild(smoke);
  const ps = smoke.particlesystem!;

  if (ctx.preview) {
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      ps.depthSoftening = Math.floor(t / 3) % 2 ? 0 : 1;
    });
  } else {
    const panel = createPanel(el);
    panel.slider('depthSoftening', 0, 4, 0.05, 1, (v) => (ps.depthSoftening = v));
    panel.row();
    panel.readout('At 0 the flat quads slice visibly through the floor and the pillars; above 0 they fade out near surfaces.');
  }

  return () => scene.dispose();
};

export default mount;
