// Tone mapping is per camera: six cameras show one HDR scene through six curves
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addCanvasLabels, addSun, colorMaterial, type CanvasLabel } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const CURVES: { name: string; mode: number }[] = [
  { name: 'LINEAR', mode: pc.TONEMAP_LINEAR },
  { name: 'FILMIC', mode: pc.TONEMAP_FILMIC },
  { name: 'HEJL', mode: pc.TONEMAP_HEJL },
  { name: 'ACES', mode: pc.TONEMAP_ACES },
  { name: 'ACES2', mode: pc.TONEMAP_ACES2 },
  { name: 'NEUTRAL', mode: pc.TONEMAP_NEUTRAL },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app } = stage;
  app.scene.ambientLight = new pc.Color(0.2, 0.2, 0.25);

  // Lighting is HDR: a strong sun on saturated materials pushes values past 1.
  const sun = addSun(app, 45, 35, { intensity: 3.5 });
  const light = new pc.Entity('fill');
  light.addComponent('light', { type: 'omni', range: 12, intensity: 6, color: new pc.Color(1, 0.7, 0.4) });
  light.setPosition(-3, 3, 3);
  app.root.addChild(light);

  const colours = ['#ff2d2d', '#ffb020', '#27d36b', '#2d9cff', '#b24bff', '#ffffff'];
  const spheres = colours.map((hex, i) => {
    const s = new pc.Entity();
    s.addComponent('render', { type: 'sphere', material: colorMaterial(hex) });
    s.setLocalPosition((i - 2.5) * 1.15, 0, 0);
    app.root.addChild(s);
    return s;
  });
  const floor = new pc.Entity();
  floor.addComponent('render', { type: 'plane', material: colorMaterial('#d9d9d9') });
  floor.setLocalPosition(0, -0.5, 0);
  floor.setLocalScale(10, 1, 6);
  app.root.addChild(floor);

  const cameras: pc.CameraComponent[] = [];
  const labels: CanvasLabel[] = [];
  CURVES.forEach(({ name, mode }, i) => {
    const rect: [number, number, number, number] = [(i % 3) / 3, i < 3 ? 0.5 : 0, 1 / 3, 0.5];
    const entity = addCamera(app, { rect: new pc.Vec4(...rect), priority: i, fov: 40 }, `camera-${name}`);
    entity.setPosition(0, 2.2, 6);
    entity.lookAt(0, 0, 0);
    const cam = entity.camera!;
    cam.toneMapping = mode; // e.g. pc.TONEMAP_ACES
    cameras.push(cam);
    labels.push({ text: `TONEMAP_${name}`, rect });
  });
  addCanvasLabels(stage.canvas, labels);

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    sun.setEulerAngles(45, 35 + Math.sin(t * 0.5) * 30, 0);
    spheres.forEach((s, i) => s.setLocalPosition((i - 2.5) * 1.15, Math.sin(t * 1.2 + i) * 0.2, 0));
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('gammaCorrection', ['GAMMA_SRGB', 'GAMMA_NONE'] as const, 'GAMMA_SRGB', (v) => {
      for (const cam of cameras) cam.gammaCorrection = v === 'GAMMA_SRGB' ? pc.GAMMA_SRGB : pc.GAMMA_NONE;
    });
    panel.slider('sun intensity', 0.5, 8, 0.1, 3.5, (v) => (sun.light!.intensity = v));
  }

  return () => stage.dispose();
};

export default mount;
