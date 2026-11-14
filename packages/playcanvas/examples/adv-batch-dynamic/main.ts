// A dynamic batch group keeps 180 moving bullets in one draw call
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene, rng } from '../../shared/advanced.ts';
import { colorMaterial } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';

const COUNT = 180;

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { distance: 20, pitch: -30, autoRotate: 8, sun: { angles: [50, 30, 0], shadows: false } });
  const { app } = scene;
  const batcher = app.batcher;

  // Bullets that all look alike share a material: that is what a dynamic group is for.
  const material = colorMaterial('#ff8a5c', { gloss: 0.7, emissive: new pc.Color(0.25, 0.08, 0.02) });
  const rand = rng(9);
  const bullets = Array.from({ length: COUNT }, (_, i) => {
    const e = new pc.Entity(`bullet ${i}`);
    e.addComponent('render', { type: 'capsule', material, castShadows: false });
    e.setLocalScale(0.18, 0.18, 0.18);
    app.root.addChild(e);
    return { e, radius: 2 + rand() * 7, phase: rand() * Math.PI * 2, speed: 0.4 + rand() * 0.9, lift: 0.5 + rand() * 4 };
  });

  // dynamic = true: the members may move, rotate and scale after batching, applied on the GPU.
  const group = batcher.addGroup('Bullets', true, 40);
  const setBatched = (on: boolean): void => {
    for (const b of bullets) b.e.render!.batchGroupId = on ? group.id : -1;
  };
  setBatched(true);

  let t = 0;
  let readout: HTMLElement | null = null;
  app.on('update', (dt: number) => {
    t += dt;
    for (const b of bullets) {
      const a = b.phase + t * b.speed;
      b.e.setLocalPosition(Math.cos(a) * b.radius, b.lift + Math.sin(a * 2) * 0.6, Math.sin(a) * b.radius);
      b.e.setLocalEulerAngles(90, -(a * 180) / Math.PI, (a * 180) / Math.PI);
    }
    if (readout) readout.textContent = `${app.stats.drawCallCount} draw calls for ${COUNT} bullets`;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    readout = panel.readout();
    panel.row();
    panel.check('batched (dynamic group)', true, setBatched);
  }

  return () => {
    batcher.removeGroup(group.id);
    material.destroy();
    scene.dispose();
  };
};

export default mount;
