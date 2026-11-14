// shadowBias and normalOffsetBias against acne and peter panning, intensity
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addCanvasLabels, addGround, addShape, addSun } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app } = stage;
  app.scene.ambientLight = new pc.Color(0.25, 0.27, 0.32);

  // A low sun on a coarse shadow map is where artifacts show up first.
  const sun = addSun(app, 28, 40, {
    castShadows: true, shadowResolution: 512, shadowDistance: 16, shadowBias: 0, normalOffsetBias: 0, intensity: 1.8,
    shadowType: pc.SHADOW_PCF1_32F,
  });
  const light = sun.light!;
  addGround(app, '#7a8399', 20);
  addShape(app, 'box', '#e8794a', [-2.5, 0.8, 0], 1.6);
  addShape(app, 'sphere', '#4ab3e8', [0.5, 0.9, 1], 1.8);
  addShape(app, 'cone', '#f2c14e', [3, 1, -1], [1.6, 2, 1.6]);
  const tilted = addShape(app, 'box', '#7bc67b', [0, 1.6, -3], [4, 0.2, 2]);
  tilted.setLocalEulerAngles(0, 0, 14);

  const camera = addCamera(app, { clearColor: new pc.Color(0.5, 0.6, 0.75) });
  const orbit = createOrbit(app, camera, { target: new pc.Vec3(0, 0.8, 0), distance: 11, pitch: -32, yaw: 15, autoRotate: 0, interactive: !ctx.preview });

  const label = addCanvasLabels(stage.canvas, [{ text: '', rect: [0, 0, 1, 1] }]).firstElementChild!;
  const show = (): void => {
    label.textContent = `shadowBias ${light.shadowBias.toFixed(2)}  normalOffsetBias ${light.normalOffsetBias.toFixed(2)}`;
  };

  // Cards sweep both biases up and down: acne at zero, then clean, then shadows detach from their casters.
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    if (!ctx.preview) return;
    const k = (Math.sin(t * 0.5) * 0.5 + 0.5);
    light.shadowBias = k * 0.8;
    light.normalOffsetBias = k * 0.6;
    orbit.yaw = 15 + Math.sin(t * 0.2) * 15;
    show();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('shadowBias', 0, 1, 0.01, 0, (v) => ((light.shadowBias = v), show()));
    panel.slider('normalOffsetBias', 0, 1, 0.01, 0, (v) => ((light.normalOffsetBias = v), show()));
    panel.slider('shadowIntensity', 0, 1, 0.05, 1, (v) => (light.shadowIntensity = v));
    panel.select('shadowResolution', ['256', '512', '1024', '2048'] as const, '512', (v) => (light.shadowResolution = Number(v)));
    show();
  }

  return () => {
    orbit.dispose();
    stage.dispose();
  };
};

export default mount;
