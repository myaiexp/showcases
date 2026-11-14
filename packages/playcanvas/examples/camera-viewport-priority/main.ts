// Camera rect and priority: split screen and picture-in-picture from three cameras
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 9, pitch: -20, autoRotate: 18 }, floor: 14 });
  const { app, camera } = scene;
  const main = camera.camera!;
  // rect is x, y, width, height in 0-1 of the canvas, from the lower left corner.
  main.rect = new pc.Vec4(0, 0, 0.5, 1);

  const shapes = ['box', 'sphere', 'cone', 'cylinder', 'capsule'] as const;
  const cols = ['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8', '#a78bfa'];
  const items = shapes.map((s, i) => addShape(app.root, s, material(cols[i]!), [Math.cos(i * 1.256) * 2.5, 0.6, Math.sin(i * 1.256) * 2.5]));

  // Right half: a top-down camera.
  const top = new pc.Entity('top');
  top.addComponent('camera', { clearColor: new pc.Color(0.2, 0.14, 0.2), rect: new pc.Vec4(0.5, 0, 0.5, 1), priority: 0 });
  top.setPosition(0, 12, 0.01);
  top.lookAt(0, 0, 0);
  app.root.addChild(top);

  // A small picture-in-picture view that draws over both halves when its priority is higher.
  const pip = new pc.Entity('pip');
  pip.addComponent('camera', { clearColor: new pc.Color(0.05, 0.25, 0.2), rect: new pc.Vec4(0.35, 0.05, 0.3, 0.35), priority: 1, fov: 70 });
  pip.setPosition(0, 1.2, 4);
  pip.lookAt(0, 0.6, 0);
  app.root.addChild(pip);
  // The viewport camera clears and draws only inside its own rect, so scissor to it.
  pip.camera!.scissorRect = pip.camera!.rect;

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    items.forEach((s, i) => s.setLocalPosition(Math.cos(t * 0.6 + i * 1.256) * 2.5, 0.6, Math.sin(t * 0.6 + i * 1.256) * 2.5));
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('main width', 0.2, 1, 0.01, 0.5, (v) => {
      main.rect = new pc.Vec4(0, 0, v, 1);
      top.camera!.rect = new pc.Vec4(v, 0, 1 - v, 1);
    });
    panel.slider('pip priority', -1, 2, 1, 1, (v) => (pip.camera!.priority = v));
    panel.slider('pip x', 0, 0.7, 0.01, 0.35, (v) => setPip({ x: v }));
    panel.slider('pip height', 0.1, 0.6, 0.01, 0.35, (v) => setPip({ h: v }));
    panel.row();
    panel.readout('Priority orders the cameras: smaller renders first. Drop the pip below 0 and the halves paint over it.');
    const pipRect = { x: 0.35, y: 0.05, w: 0.3, h: 0.35 };
    function setPip(p: { x?: number; h?: number }): void {
      pipRect.x = p.x ?? pipRect.x;
      pipRect.h = p.h ?? pipRect.h;
      const r = new pc.Vec4(pipRect.x, pipRect.y, pipRect.w, pipRect.h);
      pip.camera!.rect = r;
      pip.camera!.scissorRect = r;
    }
  }

  return () => scene.dispose();
};

export default mount;
