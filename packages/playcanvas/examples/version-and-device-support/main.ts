// pc.version and the device createGraphicsDevice chose (WebGPU, else WebGL 2)
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  // Asking for WebGPU is safe: the engine falls back to WebGL 2.
  const scene = await createScene(el, ctx, { device: 'webgpu', orbit: { distance: 4, pitch: -15 } });
  const { app, stage } = scene;

  const cube = addShape(app.root, 'box', material('#a78bfa', { metalness: 0.4, gloss: 0.7 }));
  const ring = addShape(app.root, 'sphere', material('#f2c14e'), [1.6, 0, 0], 0.3);
  const pivot = new pc.Entity('pivot');
  app.root.addChild(pivot);
  pivot.addChild(ring);
  app.on('update', (dt: number) => {
    cube.rotate(10 * dt, 25 * dt, 0);
    pivot.rotate(0, 60 * dt, 0);
  });

  if (!ctx.preview) {
    const d = stage.device;
    const panel = createPanel(el);
    panel.readout(`Engine ${pc.version} (revision ${pc.revision})`);
    panel.row();
    panel.readout(`device: ${d.deviceType}${d.isWebGPU ? '' : ' (WebGL 2 fallback)'}`);
    panel.row();
    panel.readout(`navigator.gpu in this browser: ${'gpu' in navigator ? 'yes' : 'no'}`);
    panel.row();
    panel.readout(`max texture size ${d.maxTextureSize}, pixel ratio ${d.maxPixelRatio}, precision ${d.precision}`);
  }

  return () => scene.dispose();
};

export default mount;
