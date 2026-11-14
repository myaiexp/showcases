// An extra work buffer stream: component ids written on copy, tinted on render
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { cloudContainer, createSplatScene, discShellCloud, hue } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';
import { copyGLSL, copyWGSL, renderGLSL, renderWGSL } from './shaders.ts';

const COUNT = 6;

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { distance: 9, pitch: -25 });
  const { app } = scene;
  const device = scene.stage.device;

  // 1. Add the stream to the shared work buffer format before any splat is drawn.
  app.scene.gsplat.format.addExtraStreams([{ name: 'splatId', format: pc.PIXELFORMAT_R32U }]);

  // 2. Every component's copy modifier must write every extra stream.
  const container = cloudContainer(device, discShellCloud(1400, 0.9));
  const parts = Array.from({ length: COUNT }, (_, i) => {
    const entity = scene.add(container, `part-${i}`);
    const a = (i / COUNT) * Math.PI * 2;
    entity.setPosition(Math.cos(a) * 2.6, Math.sin(a * 2) * 0.4, Math.sin(a) * 2.6);
    entity.gsplat!.setWorkBufferModifier({ glsl: copyGLSL, wgsl: copyWGSL });
    entity.gsplat!.setParameter('uComponentId', i);
    return entity;
  });

  // 3. The render stage is global: look up one colour per id in a small texture.
  const lookup = new pc.Texture(device, {
    name: 'component-colours',
    width: COUNT,
    height: 1,
    format: pc.PIXELFORMAT_RGBA8,
    mipmaps: false,
    minFilter: pc.FILTER_NEAREST,
    magFilter: pc.FILTER_NEAREST,
    addressU: pc.ADDRESS_CLAMP_TO_EDGE,
    addressV: pc.ADDRESS_CLAMP_TO_EDGE,
  });
  const material = app.scene.gsplat.material;
  material.getShaderChunks('glsl').set('gsplatModifyVS', renderGLSL);
  material.getShaderChunks('wgsl').set('gsplatModifyVS', renderWGSL);
  material.setParameter('uColorLookup', lookup);
  material.update();

  let time = 0;
  let speed = 0.25;
  app.on('update', (dt: number) => {
    time += dt * speed;
    // Animated tints: only this tiny texture changes, the work buffer is not rebuilt.
    const bytes = lookup.lock() as Uint8Array;
    for (let i = 0; i < COUNT; i++) {
      const [r, g, b] = hue((time + i / COUNT) % 1, 0.7, 1);
      bytes.set([r * 255, g * 255, b * 255, 255], i * 4);
    }
    lookup.unlock();
    parts.forEach((p, i) => p.rotate(0, (12 + i * 6) * dt, 0));
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('Colour cycling speed', 0, 1, 0.05, speed, (v) => (speed = v));
    panel.readout(`${COUNT} components share one container; the splatId stream tells the render stage which is which`);
  }

  return () => {
    material.getShaderChunks('glsl').delete('gsplatModifyVS');
    material.getShaderChunks('wgsl').delete('gsplatModifyVS');
    scene.dispose();
    lookup.destroy();
  };
};

export default mount;
