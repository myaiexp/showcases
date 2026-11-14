// CameraComponent.frustumCulling: draw calls with it on and off
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, material } from '../../shared/components.ts';
import { addCanvasLabels } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';

const LAYOUTS = ['spread over a field', 'packed in view'] as const;
type Layout = (typeof LAYOUTS)[number];

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 8, pitch: -22, autoRotate: 14 }, clear: '#171b26' });
  const { app, camera } = scene;
  const cam = camera.camera!;
  const mat = material('#4ab3e8', { metalness: 0.1, gloss: 0.5 });
  const N = 400;
  const boxes: pc.Entity[] = [];
  for (let i = 0; i < N; i++) {
    const e = new pc.Entity('box');
    e.addComponent('render', { type: 'box', material: mat, castShadows: false });
    e.setLocalScale(0.7, 0.7, 0.7);
    app.root.addChild(e);
    boxes.push(e);
  }
  const layout = (kind: Layout): void => {
    const cols = 20;
    const spacing = kind === 'packed in view' ? 0.45 : 2.2;
    boxes.forEach((b, i) => b.setLocalPosition(((i % cols) - (cols - 1) / 2) * spacing, 0.3, (Math.floor(i / cols) - (cols - 1) / 2) * spacing));
  };
  layout('spread over a field');

  const layer = addCanvasLabels(scene.stage.canvas, []);
  const out = document.createElement('pre');
  Object.assign(out.style, { position: 'absolute', left: '6px', top: '4px', margin: '0', padding: '4px 8px', font: '11px/1.4 monospace', color: '#e8ebf2', background: 'rgba(10,12,18,0.65)', borderRadius: '4px' });
  layer.append(out);

  let t = 0;
  let shown = 0;
  app.on('update', (dt: number) => {
    t += dt;
    shown += dt;
    if (ctx.preview) cam.frustumCulling = Math.floor(t / 3) % 2 === 0;
    if (shown > 0.3) {
      shown = 0;
      out.textContent = `frustumCulling: ${cam.frustumCulling}\nboxes: ${N}\ndraw calls: ${app.stats.drawCallCount}`;
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('camera frustumCulling', true, (on) => (cam.frustumCulling = on));
    panel.select('layout', LAYOUTS, 'spread over a field', layout);
    panel.readout('Culling saves draw calls when much of the scene is out of view, and costs a little when everything is always visible.');
  }

  return () => {
    cam.frustumCulling = true;
    mat.destroy();
    scene.dispose();
  };
};

export default mount;
