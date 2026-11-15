// Render to a texture: a frame buffer with colour and depth, then that texture on a spinning quad
import { DEPTH_CLEAR_VALUE, Matrix4x4, Vector2, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { cubeGeometry, quadGeometry, solidProgram, stateSet, texturedProgram, viewProjection } from '../../shared/device-kit.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const device = myApp.device;

  // The render target: a colour texture and a depth texture, wrapped in a frame buffer
  const size = 256;
  const colorTex = device.createTexture2D('rgba8unorm', size, size, { samplerOptions: { minFilter: 'linear', magFilter: 'linear', mipFilter: 'none' } })!;
  const depthTex = device.createTexture2D('d24s8', size, size)!;
  const framebuffer = device.createFrameBuffer([colorTex], depthTex);
  stage.own(() => {
    framebuffer.dispose();
    colorTex.dispose();
    depthTex.dispose();
  });

  const cube = cubeGeometry(device, 1);
  const solid = solidProgram(device);
  const quad = quadGeometry(device, 1.5);
  const textured = texturedProgram(device);
  textured.group0.setValue('uvScale', new Vector2(1, 1));
  textured.group1.setTexture('tex', colorTex);

  const cubeStates = stateSet(device, 'back');
  const quadStates = stateSet(device, 'none');
  const offscreenClear = new Vector4(0.9, 0.85, 0.7, 1);
  const screenClear = new Vector4(0.06, 0.08, 0.12, 1);
  const color = new Vector4(0.2, 0.55, 0.95, 1);
  let spin = 1;
  let angle = 0;

  myApp.on('tick', (dt, ms) => {
    angle += dt * 0.001 * spin;
    // Pass 1: the cube into the texture. Save the device state, restore it after
    device.pushDeviceStates();
    device.setFramebuffer(framebuffer);
    device.clearFrameBuffer(offscreenClear, DEPTH_CLEAR_VALUE, 0);
    const model = Matrix4x4.multiply(Matrix4x4.rotationY(ms * 0.001), Matrix4x4.rotationX(ms * 0.0007));
    solid.bindGroup.setValue('model', model);
    solid.bindGroup.setValue('mvp', Matrix4x4.multiply(viewProjection(device, 0, 4.5, 1, 1), model));
    solid.bindGroup.setValue('color', color);
    device.setVertexLayout(cube.layout);
    device.setProgram(solid.program);
    device.setRenderStates(cubeStates);
    device.setBindGroup(0, solid.bindGroup);
    device.draw('triangle-list', 0, cube.count);
    device.popDeviceStates();

    // Pass 2: the screen. A quad turning in front of the camera shows the texture
    textured.group0.setValue('mvp', Matrix4x4.multiply(viewProjection(device, 0, 5, 0), Matrix4x4.rotationY(angle)));
    device.clearFrameBuffer(screenClear, DEPTH_CLEAR_VALUE, 0);
    device.setVertexLayout(quad.layout);
    device.setProgram(textured.program);
    device.setRenderStates(quadStates);
    device.setBindGroup(0, textured.group0);
    device.setBindGroup(1, textured.group1);
    device.draw('triangle-strip', 0, 4);
  });
  if (stage.bar) {
    slider(stage.bar, 'quad spin', [-3, 3, 0.1], 1, (v) => (spin = v));
  } else {
    stage.caption('cube drawn into a 256x256 texture, shown on a quad');
  }
  myApp.run();
});
