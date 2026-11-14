// Shadow types on a directional light: PCF kernels, variance maps and PCSS
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addCanvasLabels, addGround, addShape, addSun } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const TYPES: Record<string, number> = {
  SHADOW_PCF1_32F: pc.SHADOW_PCF1_32F,
  SHADOW_PCF3_32F: pc.SHADOW_PCF3_32F,
  SHADOW_PCF5_32F: pc.SHADOW_PCF5_32F,
  SHADOW_VSM_16F: pc.SHADOW_VSM_16F,
  SHADOW_VSM_32F: pc.SHADOW_VSM_32F,
  SHADOW_PCSS_32F: pc.SHADOW_PCSS_32F,
};
const NAMES = Object.keys(TYPES);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app } = stage;
  app.scene.ambientLight = new pc.Color(0.25, 0.27, 0.32);

  // A small shadow map makes the filter's softness easy to see.
  const sun = addSun(app, 48, 35, { castShadows: true, shadowResolution: 512, shadowDistance: 18, normalOffsetBias: 0.04, shadowBias: 0.2, intensity: 1.6 });
  const light = sun.light!;
  addGround(app, '#5a6277', 20);
  // One box touching the floor and one ball hovering high above it: PCSS sharpens the first and blurs the second.
  addShape(app, 'box', '#e8794a', [-2, 0.75, 0], 1.5);
  addShape(app, 'sphere', '#4ab3e8', [2, 3, 0], 1.6);
  addShape(app, 'cylinder', '#7bc67b', [0, 1.5, -2.6], [0.8, 3, 0.8]);

  const camera = addCamera(app, { clearColor: new pc.Color(0.5, 0.6, 0.75) });
  const orbit = createOrbit(app, camera, { target: new pc.Vec3(0, 1, 0), distance: 11, pitch: -30, yaw: 0, autoRotate: 0, interactive: !ctx.preview });

  const label = addCanvasLabels(stage.canvas, [{ text: '', rect: [0, 0, 1, 1] }]).firstElementChild!;
  const apply = (name: string): void => {
    light.shadowType = TYPES[name]!;
    label.textContent = name;
  };
  apply('SHADOW_PCF3_32F');

  let t = 0;
  let current = '';
  app.on('update', (dt: number) => {
    t += dt;
    orbit.yaw = Math.sin(t * 0.3) * 25;
    if (ctx.preview) {
      const name = NAMES[Math.floor(t / 2.5) % NAMES.length]!;
      if (name !== current) apply(name);
      current = name;
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('shadowType', NAMES, 'SHADOW_PCF3_32F', apply);
    panel.row();
    panel.slider('vsmBlurSize (VSM)', 1, 25, 2, 11, (v) => (light.vsmBlurSize = v));
    panel.select('vsmBlurMode (VSM)', ['BLUR_GAUSSIAN', 'BLUR_BOX'] as const, 'BLUR_GAUSSIAN', (v) => (light.vsmBlurMode = v === 'BLUR_BOX' ? pc.BLUR_BOX : pc.BLUR_GAUSSIAN));
    panel.slider('vsmBias (VSM)', 0, 0.02, 0.0005, 0.0025, (v) => (light.vsmBias = v));
    panel.row();
    panel.slider('penumbraSize (PCSS)', 0.2, 8, 0.1, 2, (v) => (light.penumbraSize = v));
    panel.slider('penumbraFalloff (PCSS)', 1, 4, 0.1, 1, (v) => (light.penumbraFalloff = v));
    panel.slider('shadowSamples (PCSS)', 1, 32, 1, 16, (v) => (light.shadowSamples = v));
    panel.slider('shadowBlockerSamples (PCSS)', 0, 32, 1, 16, (v) => (light.shadowBlockerSamples = v));
  }

  return () => {
    orbit.dispose();
    stage.dispose();
  };
};

export default mount;
