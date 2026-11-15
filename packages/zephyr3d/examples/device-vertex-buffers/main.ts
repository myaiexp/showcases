// Three ways to feed the same cube: separate vertex buffers, one interleaved buffer, a 32-bit index buffer
import { DEPTH_CLEAR_VALUE, Matrix4x4, Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application } from '@zephyr3d/scene';
import { cubeData, cubeGeometry, solidProgram, stateSet, viewProjection } from '../../shared/device-kit.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const device = myApp.device;
  const { pos, nor, idx } = cubeData(1);

  // 1. One buffer per attribute (position_f32x3, normal_f32x3), 16-bit indices
  const separate = cubeGeometry(device, 1);

  // 2. One interleaved buffer: position and normal alternate in memory
  const interleaved = new Float32Array(24 * 6);
  for (let v = 0; v < 24; v++) {
    interleaved.set(pos.slice(v * 3, v * 3 + 3), v * 6);
    interleaved.set(nor.slice(v * 3, v * 3 + 3), v * 6 + 3);
  }
  const interleavedLayout = device.createVertexLayout({
    vertexBuffers: [{ buffer: device.createInterleavedVertexBuffer(['position_f32x3', 'normal_f32x3'], interleaved)! }],
    indexBuffer: device.createIndexBuffer(new Uint16Array(idx)),
  });

  // 3. Separate buffers again, but with 32-bit indices (when the device supports them)
  const wide = device.getDeviceCaps().miscCaps.support32BitIndex;
  const wideLayout = device.createVertexLayout({
    vertexBuffers: [
      { buffer: device.createVertexBuffer('position_f32x3', new Float32Array(pos))! },
      { buffer: device.createVertexBuffer('normal_f32x3', new Float32Array(nor))! },
    ],
    indexBuffer: device.createIndexBuffer(wide ? new Uint32Array(idx) : new Uint16Array(idx)),
  });

  const { program, bindGroup } = solidProgram(device);
  const states = stateSet(device, 'back');
  const clear = new Vector4(0.06, 0.08, 0.12, 1);
  const entries = [
    { layout: separate.layout, x: -2.6, color: new Vector4(0.95, 0.5, 0.25, 1) },
    { layout: interleavedLayout, x: 0, color: new Vector4(0.3, 0.8, 0.5, 1) },
    { layout: wideLayout, x: 2.6, color: new Vector4(0.35, 0.55, 1, 1) },
  ];

  myApp.on('tick', (_dt, ms) => {
    device.clearFrameBuffer(clear, DEPTH_CLEAR_VALUE, 0);
    device.setRenderStates(states);
    device.setProgram(program);
    device.setBindGroup(0, bindGroup);
    const spin = Matrix4x4.multiply(Matrix4x4.rotationY(ms * 0.0007), Matrix4x4.rotationX(ms * 0.0004));
    for (const e of entries) {
      const model = Matrix4x4.multiply(Matrix4x4.translation(new Vector3(e.x, 0, 0)), spin);
      bindGroup.setValue('model', model);
      bindGroup.setValue('mvp', Matrix4x4.multiply(viewProjection(device, 0, 8, 1.5), model));
      bindGroup.setValue('color', e.color);
      device.setVertexLayout(e.layout);
      device.draw('triangle-list', 0, idx.length);
    }
  });
  stage.caption(`separate buffers | interleaved buffer | ${wide ? 'Uint32' : 'Uint16'} indices`);
  myApp.run();
});
