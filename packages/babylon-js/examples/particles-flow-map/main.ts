// Particle flow map: a generated screen-space swirl steers the particles
import { ArcRotateCamera, Color4, FlowMap, ParticleSystem, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createFlareTexture } from '../../shared/flare.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

/**
 * RGBA per pixel: R and G are the screen X and Y direction (0.5 = none), B the depth
 * direction, A the strength. This one swirls counter-clockwise around the centre and
 * is strongest in a ring.
 */
function swirl(size: number): Uint8ClampedArray {
  const data = new Uint8ClampedArray(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x / size - 0.5;
      const dy = y / size - 0.5;
      const r = Math.hypot(dx, dy) || 1e-6;
      const i = (y * size + x) * 4;
      data[i] = 127.5 + (-dy / r) * 127.5;
      data[i + 1] = 127.5 + (dx / r) * 127.5;
      data[i + 2] = 127.5;
      data[i + 3] = 255 * Math.exp(-((r - 0.25) ** 2) / 0.01);
    }
  }
  return data;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  scene.clearColor = new Color4(0.02, 0.03, 0.06, 1);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 12, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);

  const system = new ParticleSystem('flow', ctx.preview ? 2000 : 6000, scene);
  system.particleTexture = createFlareTexture(scene);
  system.blendMode = ParticleSystem.BLENDMODE_ADD;
  system.emitter = Vector3.Zero();
  system.createBoxEmitter(new Vector3(0, 0, 0), new Vector3(0, 0, 0), new Vector3(-5, -3, 0), new Vector3(5, 3, 0));
  system.emitRate = ctx.preview ? 500 : 1500;
  system.minLifeTime = 2;
  system.maxLifeTime = 4;
  system.minEmitPower = system.maxEmitPower = 0;
  system.minSize = 0.06;
  system.maxSize = 0.14;
  system.color1 = new Color4(0.4, 0.8, 1, 1);
  system.color2 = new Color4(0.6, 1, 0.7, 1);
  system.colorDead = new Color4(0, 0, 0.3, 0);

  // A CPU particle system takes the flow map as raw bytes: FlowMap(width, height, data).
  const size = 128;
  system.flowMap = new FlowMap(size, size, swirl(size));
  system.flowMapStrength = 4;
  system.start();

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('flowMapStrength', 0, 12, 0.1, system.flowMapStrength, (v) => (system.flowMapStrength = v));
    panel.readout('The map is screen-aligned: orbit the camera and the swirl stays put on screen.');
  }

  stage.run();
  return () => {
    system.dispose();
    stage.dispose();
  };
};

export default mount;
