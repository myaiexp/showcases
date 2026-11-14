// Batch groups: 144 boxes cost 144 draw calls until a batch group merges them
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, material } from '../../shared/components.ts';
import { addCanvasLabels } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';

const MODES = ['none', 'static batch', 'dynamic batch'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 13, pitch: -40, autoRotate: 9 }, clear: '#171b26' });
  const { app } = scene;
  const batcher = app.batcher;

  // Two global batch groups, as scene settings would define them in the Editor.
  const staticGroup = batcher.addGroup('static', false, 100);
  const dynamicGroup = batcher.addGroup('dynamic', true, 100);

  const shared = material('#e8794a', { metalness: 0.1, gloss: 0.5 });
  const own: pc.StandardMaterial[] = [];
  const boxes: pc.Entity[] = [];
  const state = { mode: 'none' as Mode, uniqueMaterials: false, animate: true };

  const groupId = (): number => (state.mode === 'static batch' ? staticGroup.id : state.mode === 'dynamic batch' ? dynamicGroup.id : -1);
  const build = (n: number): void => {
    boxes.splice(0).forEach((b) => b.destroy());
    own.splice(0).forEach((m) => m.destroy());
    for (let i = 0; i < n; i++) {
      let m = shared;
      if (state.uniqueMaterials) {
        m = material('#e8794a', { metalness: 0.1, gloss: 0.5 });
        m.diffuse = new pc.Color(0.9, 0.45 + (i % 10) * 0.05, 0.3);
        m.update();
        own.push(m);
      }
      const e = new pc.Entity('box');
      e.addComponent('render', { type: 'box', material: m, batchGroupId: groupId(), castShadows: false });
      e.setLocalPosition(((i % 12) - 5.5) * 0.9, 0.3, (Math.floor(i / 12) - 5.5) * 0.9);
      e.setLocalScale(0.6, 0.6, 0.6);
      app.root.addChild(e);
      boxes.push(e);
    }
  };
  const regroup = (): void => {
    const id = groupId();
    for (const b of boxes) b.render!.batchGroupId = id;
  };
  build(144);

  const layer = addCanvasLabels(scene.stage.canvas, []);
  const out = document.createElement('pre');
  Object.assign(out.style, { position: 'absolute', left: '6px', top: '4px', margin: '0', padding: '4px 8px', font: '11px/1.4 monospace', color: '#e8ebf2', background: 'rgba(10,12,18,0.65)', borderRadius: '4px' });
  layer.append(out);

  let t = 0;
  let shown = 0;
  app.on('update', (dt: number) => {
    t += dt;
    shown += dt;
    if (ctx.preview) {
      // Cards cannot be clicked: alternate between separate objects and a batch group.
      const mode: Mode = Math.floor(t / 2.5) % 2 ? 'dynamic batch' : 'none';
      if (mode !== state.mode) {
        state.mode = mode;
        regroup();
      }
    }
    // Static batches are baked: only unbatched and dynamic boxes can move.
    if (state.animate && state.mode !== 'static batch') {
      boxes.forEach((b, i) => {
        const p = b.getLocalPosition();
        b.setLocalPosition(p.x, 0.3 + 0.25 * Math.sin(t * 2 + i * 0.4), p.z);
      });
    }
    if (shown > 0.3) {
      shown = 0;
      out.textContent = `mode: ${state.mode}\nboxes: ${boxes.length}\ndraw calls: ${app.stats.drawCallCount}`;
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('batching', MODES, state.mode, (m) => {
      state.mode = m;
      regroup();
    });
    panel.check('animate (not while static)', true, (on) => (state.animate = on));
    panel.check('a material per box', false, (on) => {
      state.uniqueMaterials = on;
      build(boxes.length);
    });
    panel.slider('boxes', 12, 144, 12, 144, build);
    panel.readout('A batch needs the same material, so a material per box keeps the draw calls high.');
  }

  return () => {
    boxes.forEach((b) => b.destroy());
    batcher.removeGroup(staticGroup.id);
    batcher.removeGroup(dynamicGroup.id);
    own.forEach((m) => m.destroy());
    shared.destroy();
    scene.dispose();
  };
};

export default mount;
