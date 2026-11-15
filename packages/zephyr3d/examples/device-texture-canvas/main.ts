// A texture from a 2D canvas: createTexture2DFromImage once, updateFromElement every frame
import { DEPTH_CLEAR_VALUE, Matrix4x4, Vector2, Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application } from '@zephyr3d/scene';
import { toggle } from '../../shared/controls.ts';
import { quadGeometry, stateSet, texturedProgram, viewProjection } from '../../shared/device-kit.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const device = myApp.device;

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const paint = (ms: number): void => {
    ctx.fillStyle = '#10213a';
    ctx.fillRect(0, 0, 256, 128);
    ctx.strokeStyle = '#4da3ff';
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, 244, 116);
    ctx.fillStyle = '#ffd166';
    ctx.font = 'bold 44px monospace';
    ctx.textAlign = 'center';
    ctx.fillText((ms / 1000).toFixed(2), 128, 74);
    ctx.fillStyle = '#9ad';
    ctx.font = '14px monospace';
    ctx.fillText('2D canvas -> texture', 128, 108);
  };
  paint(0);

  // The second argument says whether the image is sRGB. This raw example writes to the screen without gamma encoding, so false keeps it faithful
  const texture = device.createTexture2DFromImage(canvas, false, {
    samplerOptions: { magFilter: 'linear', minFilter: 'linear', mipFilter: 'none', addressU: 'clamp', addressV: 'clamp' },
  })!;
  stage.own(() => texture.dispose());

  const quad = quadGeometry(device, 1);
  const { program, group0, group1 } = texturedProgram(device);
  group0.setValue('uvScale', new Vector2(1, 1));
  group1.setTexture('tex', texture);
  const states = stateSet(device, 'none', false);
  const clear = new Vector4(0.03, 0.04, 0.07, 1);
  let live = true;

  myApp.on('tick', (_dt, ms) => {
    if (live) {
      paint(ms);
      // Copy the canvas (0, 0, 256, 128) into the texture at (0, 0)
      texture.updateFromElement(canvas, 0, 0, 0, 0, 256, 128);
    }
    const model = Matrix4x4.multiply(Matrix4x4.rotationY(Math.sin(ms * 0.0006) * 0.7), Matrix4x4.scaling(new Vector3(2.2, 1.1, 1)));
    group0.setValue('mvp', Matrix4x4.multiply(viewProjection(device, 0, 5, 0), model));
    device.clearFrameBuffer(clear, DEPTH_CLEAR_VALUE, 0);
    device.setVertexLayout(quad.layout);
    device.setRenderStates(states);
    device.setProgram(program);
    device.setBindGroup(0, group0);
    device.setBindGroup(1, group1);
    device.draw('triangle-strip', 0, 4);
  });
  if (stage.bar) {
    toggle(stage.bar, 'updateFromElement every frame', true, (v) => (live = v));
  } else {
    stage.caption('createTexture2DFromImage + updateFromElement');
  }
  myApp.run();
});
