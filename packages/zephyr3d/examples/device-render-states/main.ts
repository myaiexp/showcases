// Render states: blending, depth test and write, face culling and the vertex winding order
import { DEPTH_CLEAR_VALUE, Matrix4x4, Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application } from '@zephyr3d/scene';
import { select, toggle } from '../../shared/controls.ts';
import { cubeGeometry, solidProgram, viewProjection } from '../../shared/device-kit.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const device = myApp.device;

  const cube = cubeGeometry(device, 1);
  const { program, bindGroup } = solidProgram(device);
  const clear = new Vector4(0.06, 0.08, 0.12, 1);
  const tints = [new Vector4(1, 0.25, 0.2, 0.6), new Vector4(0.2, 1, 0.35, 0.6), new Vector4(0.25, 0.4, 1, 0.6)];
  const centers = [new Vector3(-0.7, 0, 0), new Vector3(0.7, 0.3, -0.5), new Vector3(0, -0.4, 0.7)];

  // One RenderStateSet holds every state; the controls below edit it and it is set again before each draw
  const states = device.createRenderStateSet();
  const blending = states.useBlendingState();
  const depth = states.useDepthState();
  const raster = states.useRasterizerState();
  blending.enable(true).setBlendFunc('src-alpha', 'inv-src-alpha');
  depth.enableTest(true).enableWrite(false);
  raster.setCullMode('back');
  stage.own(() => device.reverseVertexWindingOrder(false));

  myApp.on('tick', (_dt, ms) => {
    device.clearFrameBuffer(clear, DEPTH_CLEAR_VALUE, 0);
    device.setVertexLayout(cube.layout);
    device.setProgram(program);
    device.setBindGroup(0, bindGroup);
    device.setRenderStates(states);
    const spin = Matrix4x4.multiply(Matrix4x4.rotationY(ms * 0.0006), Matrix4x4.rotationX(ms * 0.0004));
    tints.forEach((tint, i) => {
      const model = Matrix4x4.multiply(Matrix4x4.translation(centers[i]!), spin);
      bindGroup.setValue('model', model);
      bindGroup.setValue('mvp', Matrix4x4.multiply(viewProjection(device, 0, 5.5, 1.5), model));
      bindGroup.setValue('color', tint);
      device.draw('triangle-list', 0, cube.count);
    });
  });

  if (stage.bar) {
    select(stage.bar, 'blend', ['alpha', 'additive', 'off'] as const, 'alpha', (v) => {
      blending.enable(v !== 'off');
      if (v === 'alpha') blending.setBlendFunc('src-alpha', 'inv-src-alpha');
      if (v === 'additive') blending.setBlendFunc('one', 'one');
    });
    toggle(stage.bar, 'depth test', true, (v) => depth.enableTest(v));
    toggle(stage.bar, 'depth write', false, (v) => depth.enableWrite(v));
    select(stage.bar, 'cull', ['back', 'front', 'none'] as const, 'back', (v) => raster.setCullMode(v));
    toggle(stage.bar, 'reverseVertexWindingOrder', false, (v) => device.reverseVertexWindingOrder(v));
  } else {
    stage.caption('blend alpha, depth write off, cull back');
  }
  myApp.run();
});
