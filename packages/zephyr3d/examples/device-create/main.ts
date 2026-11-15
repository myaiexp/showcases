// Creating a device without the engine: createDevice, getDeviceCaps, and both frame loops
import { DEPTH_CLEAR_VALUE, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { AbstractDevice } from '@zephyr3d/device';
import { select } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  // The docs create a WebGPU device when backendWebGPU.supported(); this gallery runs the WebGL2 backend
  if (!(await backendWebGL2.supported())) throw new Error('WebGL2 is not supported here');
  const device = await backendWebGL2.createDevice(stage.canvas, { dpr: stage.pixelRatio });
  if (!device) throw new Error('Create device failed');

  const clearColor = new Vector4(0, 0, 0, 1);
  let frames = 0;
  const render = (d: AbstractDevice): void => {
    frames++;
    const t = performance.now() * 0.001;
    clearColor.setXYZW(0.1 + 0.1 * Math.sin(t), 0.3 + 0.15 * Math.sin(t * 1.3), 0.45 + 0.15 * Math.sin(t * 0.7), 1);
    d.clearFrameBuffer(clearColor, DEPTH_CLEAR_VALUE, 0);
    d.setFont('16px monospace');
    d.drawText(`frame ${frames}`, 12, 12, '#ffffff');
  };

  // Two ways to drive frames. Either wrap every frame in beginFrame() and endFrame() ...
  let raf = 0;
  const manualLoop = (): void => {
    if (device.beginFrame()) {
      render(device);
      device.endFrame();
    }
    raf = requestAnimationFrame(manualLoop);
  };
  // ... or hand runLoop() a callback and let the device do both
  const start = (mode: string): void => {
    if (mode === 'runLoop') device.runLoop(render);
    else raf = requestAnimationFrame(manualLoop);
  };
  const stop = (): void => {
    cancelAnimationFrame(raf);
    device.exitLoop();
  };
  let mode = 'runLoop';
  start(mode);
  stage.own(stop);

  if (stage.bar) {
    select(stage.bar, 'frame loop', ['runLoop', 'beginFrame / endFrame'], mode, (v) => {
      stop();
      mode = v;
      start(mode);
    });
    const caps = device.getDeviceCaps();
    stage.readout()!.textContent = [
      `max texture size      ${caps.textureCaps.maxTextureSize}`,
      `max draw buffers      ${caps.framebufferCaps.maxDrawBuffers}`,
      `32-bit indices        ${caps.miscCaps.support32BitIndex}`,
      `max bind groups       ${caps.miscCaps.maxBindGroups}`,
      `float blending        ${caps.framebufferCaps.supportFloatBlending}`,
      `max uniform buffer    ${caps.shaderCaps.maxUniformBufferSize}`,
      'compute shaders       not on WebGL2 (WebGPU only)',
    ].join('\n');
  } else {
    stage.caption('backendWebGL2.createDevice + runLoop');
  }
});
