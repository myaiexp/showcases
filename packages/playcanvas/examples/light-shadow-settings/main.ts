// Light shadows: shadowType, shadowResolution, shadowIntensity, bias and VSM blur
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const SHADOW_TYPES: Record<string, number> = {
  'PCF 1x1': pc.SHADOW_PCF1_32F,
  'PCF 3x3': pc.SHADOW_PCF3_32F,
  'PCF 5x5': pc.SHADOW_PCF5_32F,
  'VSM 16-bit': pc.SHADOW_VSM_16F,
  'VSM 32-bit': pc.SHADOW_VSM_32F,
  'PCSS (soft)': pc.SHADOW_PCSS_32F,
};

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { sun: false, orbit: { distance: 8, pitch: -35, autoRotate: 8 }, floor: 16 });
  const { app } = scene;

  const spot = new pc.Entity('spot');
  spot.addComponent('light', {
    type: 'spot',
    range: 20,
    intensity: 3,
    innerConeAngle: 30,
    outerConeAngle: 55,
    castShadows: true,
    shadowResolution: 1024,
    shadowType: pc.SHADOW_PCF3_32F,
    shadowBias: 0.2,
    normalOffsetBias: 0.05,
    shadowIntensity: 1,
  });
  spot.setPosition(2.5, 7, 3);
  spot.lookAt(0, 0, 0);
  app.root.addChild(spot);
  const light = spot.light!;

  // Casters with fine detail, so resolution and filtering show up in the shadow edges.
  const colours = ['#e8794a', '#f2c14e', '#4ab3e8', '#a78bfa'];
  const casters = colours.map((c, i) => addShape(app.root, i % 2 ? 'cylinder' : 'box', material(c), [(i - 1.5) * 1.6, 1.2, 0], [0.5, 2.2, 0.5]));
  const pole = addShape(app.root, 'capsule', material('#7bc67b'), [0, 2, -1.5], [0.25, 4, 0.25]);
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    casters.forEach((c, i) => c.setLocalPosition((i - 1.5) * 1.6, 1.2 + Math.sin(t * 1.2 + i) * 0.5, Math.cos(t + i) * 0.8));
    pole.rotate(0, 40 * dt, 0);
    if (ctx.preview) light.shadowIntensity = 0.65 + Math.sin(t) * 0.35;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('shadowType', Object.keys(SHADOW_TYPES), 'PCF 3x3', (v) => (light.shadowType = SHADOW_TYPES[v]!));
    panel.select('shadowResolution', ['64', '256', '512', '1024', '2048'], '1024', (v) => (light.shadowResolution = Number(v)));
    panel.slider('shadowIntensity', 0, 1, 0.01, 1, (v) => (light.shadowIntensity = v));
    panel.row();
    panel.slider('shadowBias (PCF)', 0, 1, 0.01, 0.2, (v) => (light.shadowBias = v));
    panel.slider('normalOffsetBias (PCF)', 0, 1, 0.01, 0.05, (v) => (light.normalOffsetBias = v));
    panel.row();
    panel.select('vsmBlurMode (VSM)', ['box', 'gaussian'], 'gaussian', (v) => (light.vsmBlurMode = v === 'box' ? pc.BLUR_BOX : pc.BLUR_GAUSSIAN));
    panel.slider('vsmBlurSize (VSM)', 1, 25, 2, 11, (v) => (light.vsmBlurSize = v));
    panel.slider('vsmBias (VSM)', 0, 0.1, 0.001, 0.01, (v) => (light.vsmBias = v));
  }

  return () => scene.dispose();
};

export default mount;
