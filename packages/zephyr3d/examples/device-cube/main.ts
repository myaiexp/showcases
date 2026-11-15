// A lit, indexed cube with depth testing; draw() takes a first index and a count
import { DEPTH_CLEAR_VALUE, Matrix4x4, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { cubeGeometry, solidProgram, viewProjection } from '../../shared/device-kit.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const device = myApp.device;

  // Three vertex buffers and a Uint16 index buffer, tied together in a vertex layout
  const cube = cubeGeometry(device, 1);
  const { program, bindGroup } = solidProgram(device);
  const color = new Vector4(0.95, 0.55, 0.2, 1);
  const clear = new Vector4(0.06, 0.08, 0.12, 1);
  let indices = cube.count;
  // Render states are set explicitly: depth test on, back faces culled
  const states = device.createRenderStateSet();
  states.useDepthState().enableTest(true).enableWrite(true);
  states.useRasterizerState().setCullMode('back');

  myApp.on('tick', (_dt, ms) => {
    const model = Matrix4x4.multiply(Matrix4x4.rotationY(ms * 0.0008), Matrix4x4.rotationX(ms * 0.0005));
    bindGroup.setValue('model', model);
    bindGroup.setValue('mvp', Matrix4x4.multiply(viewProjection(device, 0, 5, 1.5), model));
    bindGroup.setValue('color', color);
    device.clearFrameBuffer(clear, DEPTH_CLEAR_VALUE, 0);
    device.setVertexLayout(cube.layout);
    device.setProgram(program);
    device.setRenderStates(states);
    device.setBindGroup(0, bindGroup);
    // 36 indices make 12 triangles; draw fewer to build the cube up face by face
    device.draw('triangle-list', 0, indices);
  });
  if (stage.bar) {
    slider(stage.bar, 'indices drawn', [0, 36, 3], 36, (v) => (indices = v));
  } else {
    stage.caption('indexed draw: 36 indices');
    myApp.on('tick', (_dt, ms) => {
      indices = 3 + 3 * Math.floor((ms / 350) % 12);
    });
  }
  myApp.run();
});
