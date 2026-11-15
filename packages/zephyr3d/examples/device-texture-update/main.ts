// Updating part of a texture: texture.update paints a small rectangle each frame
import { DEPTH_CLEAR_VALUE, Matrix4x4, Vector2, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application } from '@zephyr3d/scene';
import { button, slider } from '../../shared/controls.ts';
import { quadGeometry, stateSet, texturedProgram, viewProjection } from '../../shared/device-kit.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const device = myApp.device;

  const size = 64;
  const texture = device.createTexture2D('rgba8unorm', size, size, {
    samplerOptions: { magFilter: 'nearest', minFilter: 'nearest', mipFilter: 'none', addressU: 'clamp', addressV: 'clamp' },
  })!;
  stage.own(() => texture.dispose());
  const clearTexture = (): void => {
    const dark = new Uint8Array(new ArrayBuffer(size * size * 4));
    for (let i = 0; i < size * size; i++) dark.set([12, 16, 26, 255], i * 4);
    texture.update(dark, 0, 0, size, size);
  };
  clearTexture();

  const quad = quadGeometry(device, 1.6);
  const { program, group0, group1 } = texturedProgram(device);
  group0.setValue('uvScale', new Vector2(1, 1));
  group1.setTexture('tex', texture);
  const states = stateSet(device, 'none', false);
  const clear = new Vector4(0.06, 0.08, 0.12, 1);
  let patch = 6;

  myApp.on('tick', (_dt, ms) => {
    // A 6x6 block of colour (patch x patch) follows a Lissajous curve over the texture
    const t = ms * 0.0013;
    const x = Math.round((size - patch) * (0.5 + 0.5 * Math.sin(t * 1.3)));
    const y = Math.round((size - patch) * (0.5 + 0.5 * Math.sin(t * 1.9 + 1)));
    const pixels = new Uint8Array(new ArrayBuffer(patch * patch * 4));
    for (let i = 0; i < patch * patch; i++) {
      pixels.set([Math.round(127 + 127 * Math.sin(t)), Math.round(127 + 127 * Math.sin(t + 2.1)), Math.round(127 + 127 * Math.sin(t + 4.2)), 255], i * 4);
    }
    // Only this rectangle of the texture is written
    texture.update(pixels, x, y, patch, patch);

    group0.setValue('mvp', Matrix4x4.multiply(viewProjection(device, 0, 4.2, 0), Matrix4x4.rotationY(Math.sin(ms * 0.0005) * 0.5)));
    device.clearFrameBuffer(clear, DEPTH_CLEAR_VALUE, 0);
    device.setVertexLayout(quad.layout);
    device.setRenderStates(states);
    device.setProgram(program);
    device.setBindGroup(0, group0);
    device.setBindGroup(1, group1);
    device.draw('triangle-strip', 0, 4);
  });
  if (stage.bar) {
    slider(stage.bar, 'patch size', [1, 16, 1], patch, (v) => (patch = v));
    button(stage.bar, 'clear texture', clearTexture);
  } else {
    stage.caption('texture.update(pixels, x, y, 6, 6) every frame');
  }
  myApp.run();
});
