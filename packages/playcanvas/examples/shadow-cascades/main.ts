// Shadow cascades, distance and resolution: one directional light, long avenue
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addGround, addShape, addSun } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app } = stage;
  app.scene.ambientLight = new pc.Color(0.28, 0.3, 0.36);

  const sun = addSun(app, 38, 55, {
    castShadows: true, shadowResolution: 1024, shadowDistance: 90, numCascades: 1, cascadeDistribution: 0.5,
    normalOffsetBias: 0.06, shadowBias: 0.3, intensity: 1.5,
  });
  const light = sun.light!;
  addGround(app, '#566077', 400);

  // Two rows of pillars and balls running 100 units into the distance.
  const colours = ['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8', '#a78bfa', '#f472b6'];
  for (let i = 0; i < 28; i++) {
    const z = -i * 3.6;
    addShape(app, 'cylinder', colours[i % colours.length]!, [-4.5, 1.5, z], [1, 3, 1]);
    addShape(app, 'sphere', colours[(i + 3) % colours.length]!, [4.5, 1, z], 2);
  }

  const camera = addCamera(app, { clearColor: new pc.Color(0.5, 0.62, 0.8), farClip: 200, fov: 55 });
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    // The camera drifts down the avenue and back.
    const z = 14 - (Math.sin(t * 0.25) * 0.5 + 0.5) * 50;
    camera.setPosition(Math.sin(t * 0.4) * 2, 2.2, z);
    camera.lookAt(0, 1.4, z - 20);
    // Cards switch between one cascade and four so the difference near the camera shows.
    if (ctx.preview) light.numCascades = Math.floor(t / 3) % 2 === 0 ? 1 : 4;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('numCascades', 1, 4, 1, 1, (v) => (light.numCascades = v));
    panel.slider('cascadeDistribution', 0, 1, 0.05, 0.5, (v) => (light.cascadeDistribution = v));
    panel.slider('cascadeBlend', 0, 0.5, 0.01, 0, (v) => (light.cascadeBlend = v));
    panel.row();
    panel.slider('shadowDistance', 10, 150, 1, 90, (v) => (light.shadowDistance = v));
    panel.select('shadowResolution', ['256', '512', '1024', '2048', '4096'] as const, '1024', (v) => (light.shadowResolution = Number(v)));
  }

  return () => stage.dispose();
};

export default mount;
