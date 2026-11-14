// Clearing: clearColor as the background, and alpha 0 for a transparent canvas
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addShape, addSun } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['green', 'violet', 'transparent'] as const;
type Mode = (typeof MODES)[number];
const CLEAR: Record<Mode, [number, number, number, number]> = {
  green: [0.1, 0.5, 0.35, 1],
  violet: [0.3, 0.15, 0.5, 1],
  transparent: [0, 0, 0, 0],
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app } = stage;
  app.scene.ambientLight = new pc.Color(0.3, 0.32, 0.38);
  addSun(app, 50, 30);
  // The page behind the canvas: it shows through wherever the camera clears to alpha 0.
  stage.canvas.style.background = 'repeating-linear-gradient(45deg, #2b6f8f 0 24px, #e0a73c 24px 48px)';

  const knot = addShape(app, 'torus', '#e8794a', [0, 0, 0], 2.2);
  const orb = addShape(app, 'sphere', '#a78bfa', [1.8, 0, 0], 0.8);

  const camera = addCamera(app, { clearColor: new pc.Color(0.1, 0.5, 0.35) });
  camera.setPosition(0, 0, 6);
  const cam = camera.camera!;

  const setMode = (mode: Mode): void => {
    // The clear colour is the scene's background; alpha 0 lets the web page show through.
    cam.clearColor = new pc.Color(...CLEAR[mode]);
  };
  setMode('green');

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    knot.setEulerAngles(t * 40, t * 25, 0);
    orb.setLocalPosition(Math.cos(t * 1.5) * 2.6, Math.sin(t * 1.5) * 1.2, 0);
    // In a card, walk through the three modes.
    if (ctx.preview) setMode(MODES[Math.floor(t / 3) % MODES.length]!);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('clearColor', MODES, 'green', setMode);
  }

  return () => stage.dispose();
};

export default mount;
