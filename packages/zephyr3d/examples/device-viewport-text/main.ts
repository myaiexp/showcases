// Viewports, scissor and text: four views of one cube, each cleared on its own, labelled with drawText
import { DEPTH_CLEAR_VALUE, Matrix4x4, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application } from '@zephyr3d/scene';
import { toggle } from '../../shared/controls.ts';
import { cubeGeometry, solidProgram, stateSet, viewProjection } from '../../shared/device-kit.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const device = myApp.device;

  const cube = cubeGeometry(device, 1);
  const { program, bindGroup } = solidProgram(device);
  const states = stateSet(device, 'back');
  const grounds = [new Vector4(0.1, 0.12, 0.2, 1), new Vector4(0.2, 0.1, 0.12, 1), new Vector4(0.1, 0.2, 0.14, 1), new Vector4(0.2, 0.18, 0.08, 1)];
  const angles = [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2];
  const color = new Vector4(0.95, 0.6, 0.25, 1);
  let labels = true;

  myApp.on('tick', (_dt, ms) => {
    const w = device.getDrawingBufferWidth();
    const h = device.getDrawingBufferHeight();
    // The whole screen first, then each quarter gets its own viewport and scissor
    device.setViewport(null);
    device.setScissor(null);
    device.clearFrameBuffer(new Vector4(0, 0, 0, 1), DEPTH_CLEAR_VALUE, 0);
    const model = Matrix4x4.multiply(Matrix4x4.rotationY(ms * 0.0007), Matrix4x4.rotationX(ms * 0.0004));
    for (let i = 0; i < 4; i++) {
      // The origin is the bottom-left corner of the screen on every backend
      const rect = [(i % 2) * (w / 2), Math.floor(i / 2) * (h / 2), w / 2 - 2, h / 2 - 2];
      device.setViewport(rect);
      device.setScissor(rect);
      device.clearFrameBuffer(grounds[i]!, DEPTH_CLEAR_VALUE, 0);
      bindGroup.setValue('model', model);
      bindGroup.setValue('mvp', Matrix4x4.multiply(viewProjection(device, angles[i]! + ms * 0.0002, 4.5, 1.5, rect[2]! / rect[3]!), model));
      bindGroup.setValue('color', color);
      device.setVertexLayout(cube.layout);
      device.setRenderStates(states);
      device.setProgram(program);
      device.setBindGroup(0, bindGroup);
      device.draw('triangle-list', 0, cube.count);
    }
    device.setViewport(null);
    device.setScissor(null);
    if (labels) {
      device.setFont('14px monospace');
      device.drawText('setViewport + setScissor, four times', 8, 6, '#ffffff');
      device.drawText(`viewport [${device.getViewport().x}, ${device.getViewport().y}, ${device.getViewport().width}, ${device.getViewport().height}]`, 8, 24, '#9ad');
    }
  });
  if (stage.bar) {
    toggle(stage.bar, 'drawText', true, (v) => (labels = v));
  } else {
    stage.caption('four viewports, one cube');
  }
  myApp.run();
});
