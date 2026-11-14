// MiniStats: overlay sizes, collapsible sections, draw calls and VRAM
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { canvasTexture } from '../../shared/textures.ts';

const SIZES = ['compact', 'medium', 'large'] as const;

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 14, orbit: { distance: 11, pitch: -35, autoRotate: 8 }, sun: { shadows: true } });
  const { app } = scene;

  // The overlay is created after the app starts. Options come from getDefaultOptions().
  const options = pc.MiniStats.getDefaultOptions();
  options.startSizeIndex = ctx.preview ? 1 : 2;
  options.cpu.watermark = 1000 / 60;
  options.gpu.watermark = 1000 / 60;
  const miniStats = new pc.MiniStats(app, options);

  // A grid of spheres sharing one material: every sphere is a mesh instance, so a draw call.
  const shared = material('#e8794a', { metalness: 0.2, gloss: 0.6 });
  const spheres: pc.Entity[] = [];
  const setCount = (n: number): void => {
    while (spheres.length < n) {
      const i = spheres.length;
      const e = new pc.Entity('sphere');
      e.addComponent('render', { type: 'sphere', material: shared });
      e.setLocalPosition(((i % 10) - 4.5) * 0.9, 0.4, (Math.floor(i / 10) % 10 - 4.5) * 0.9 + 0.2);
      e.setLocalScale(0.5, 0.5, 0.5);
      app.root.addChild(e);
      spheres.push(e);
    }
    while (spheres.length > n) spheres.pop()!.destroy();
  };
  setCount(ctx.preview ? 40 : 30);
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    if (ctx.preview) {
      // The card cannot be clicked: change the load by itself so the counters move.
      const n = 20 + Math.round(30 * (0.5 + 0.5 * Math.sin(t * 0.8)));
      if (n !== spheres.length) setCount(n);
    }
  });

  const textures: pc.Texture[] = [];
  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('size (click the overlay to cycle)', SIZES, 'large', (v) => (miniStats.activeSizeIndex = SIZES.indexOf(v)));
    panel.slider('spheres (draw calls)', 0, 100, 1, 30, setCount);
    panel.row();
    panel.check('enabled', true, (on) => (miniStats.enabled = on));
    panel.check('engine collapsed', false, (on) => (miniStats.engineCollapsed = on));
    panel.check('cpu collapsed', false, (on) => (miniStats.cpuCollapsed = on));
    panel.check('gpu collapsed', false, (on) => (miniStats.gpuCollapsed = on));
    panel.check('vram collapsed', false, (on) => (miniStats.vramCollapsed = on));
    panel.row();
    // Textures show up in the VRAM section, and leave it when destroyed.
    panel.button('add 8 textures (1024 px)', () => {
      for (let i = 0; i < 8; i++) textures.push(canvasTexture(app.graphicsDevice, (g, s) => ((g.fillStyle = `hsl(${i * 40},60%,50%)`), g.fillRect(0, 0, s, s)), { size: 1024, mipmaps: false }));
    });
    panel.button('release textures', () => textures.splice(0).forEach((tex) => tex.destroy()));
  }

  return () => {
    textures.forEach((tex) => tex.destroy());
    miniStats.destroy();
    shared.destroy();
    scene.dispose();
  };
};

export default mount;
