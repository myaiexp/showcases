// Split screen: each camera takes a normalized rect of the screen, by priority
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addGround, addSceneryRing, addShape, addSun } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

type Layout = 'horizontal' | 'vertical' | 'quad';
// [x, y, width, height], origin bottom-left, one rect per player camera.
const RECTS: Record<Layout, [number, number, number, number][]> = {
  horizontal: [[0, 0, 0.5, 1], [0.5, 0, 0.5, 1]],
  vertical: [[0, 0.5, 1, 0.5], [0, 0, 1, 0.5]],
  quad: [[0, 0.5, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5], [0, 0, 0.5, 0.5], [0.5, 0, 0.5, 0.5]],
};
const TINTS = ['#e8794a', '#4ab3e8', '#7bc67b', '#f2c14e'];
const SKIES = [[0.25, 0.1, 0.1], [0.08, 0.15, 0.25], [0.08, 0.2, 0.1], [0.25, 0.2, 0.06]];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app } = stage;
  app.scene.ambientLight = new pc.Color(0.3, 0.32, 0.38);
  addSun(app, 55, 30);
  addGround(app, '#3a4152', 30);
  addSceneryRing(app, 10, 7);

  // Four players run circles at different radii; each camera chases one.
  const players = TINTS.map((hex) => addShape(app, 'capsule', hex, [0, 0.9, 0], [0.8, 1.2, 0.8]));
  const cameras = TINTS.map((_, i) => {
    const entity = addCamera(app, { clearColor: new pc.Color(...(SKIES[i] as [number, number, number])), priority: i }, `player-${i + 1}`);
    return entity.camera!;
  });

  const apply = (layout: Layout): void => {
    cameras.forEach((cam, i) => {
      const r = RECTS[layout][i];
      cam.enabled = !!r;
      if (r) cam.rect = new pc.Vec4(...r);
    });
  };
  apply('horizontal');

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    players.forEach((p, i) => {
      const a = t * (0.5 + i * 0.12) + i * 1.7;
      const r = 3 + i * 0.9;
      p.setPosition(Math.cos(a) * r, 0.9, Math.sin(a) * r);
      p.setEulerAngles(0, -a * pc.math.RAD_TO_DEG, 0);
      // Chase camera behind and above the player.
      const cam = cameras[i]!.entity;
      cam.setPosition(Math.cos(a - 0.5) * (r + 3), 3.5, Math.sin(a - 0.5) * (r + 3));
      cam.lookAt(p.getPosition());
    });
  });

  if (!ctx.preview) {
    createPanel(el).select('layout', ['horizontal', 'vertical', 'quad'] as const, 'horizontal', apply);
  } else {
    // Cards alternate the layouts on their own.
    let last = '';
    app.on('update', () => {
      const layout = (['horizontal', 'quad', 'vertical'] as const)[Math.floor(t / 3) % 3]!;
      if (layout !== last) apply(layout);
      last = layout;
    });
  }

  return () => stage.dispose();
};

export default mount;
