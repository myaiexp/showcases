// A stencil outline: draw the object into the stencil buffer, then a larger copy only where it is not
import { DEPTH_CLEAR_VALUE, Matrix4x4, Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { cubeGeometry, solidProgram, viewProjection } from '../../shared/device-kit.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const device = myApp.device;

  const cube = cubeGeometry(device, 1);
  const { program, bindGroup } = solidProgram(device);

  // Pass 1 states: the object writes 1 into the stencil buffer wherever it is drawn
  const markStates = device.createRenderStateSet();
  markStates.useDepthState().enableTest(true).enableWrite(true);
  markStates.useRasterizerState().setCullMode('back');
  markStates
    .useStencilState()
    .enable(true)
    .setFrontCompareFunc('always')
    .setFrontOp('keep', 'keep', 'replace')
    .setReference(1)
    .setWriteMask(0xff);

  // Pass 2 states: the enlarged copy only survives where the stencil is not 1, and never writes it
  const outlineStates = device.createRenderStateSet();
  outlineStates.useDepthState().enableTest(false).enableWrite(false);
  outlineStates.useRasterizerState().setCullMode('back');
  outlineStates
    .useStencilState()
    .enable(true)
    .setFrontCompareFunc('ne')
    .setFrontOp('keep', 'keep', 'keep')
    .setReference(1)
    .setReadMask(0xff)
    .setWriteMask(0);

  const body = new Vector4(0.25, 0.55, 0.95, 1);
  const edge = new Vector4(1, 0.8, 0.2, 1);
  const clear = new Vector4(0.06, 0.08, 0.12, 1);
  let width = 1.15;

  const draw = (model: Matrix4x4, color: Vector4): void => {
    bindGroup.setValue('model', model);
    bindGroup.setValue('mvp', Matrix4x4.multiply(viewProjection(device, 0, 5, 1.5), model));
    bindGroup.setValue('color', color);
    device.draw('triangle-list', 0, cube.count);
  };

  myApp.on('tick', (_dt, ms) => {
    const spin = Matrix4x4.multiply(Matrix4x4.rotationY(ms * 0.0008), Matrix4x4.rotationX(ms * 0.0005));
    // The stencil buffer is cleared to 0 with the colour and depth
    device.clearFrameBuffer(clear, DEPTH_CLEAR_VALUE, 0);
    device.setVertexLayout(cube.layout);
    device.setProgram(program);
    device.setBindGroup(0, bindGroup);
    device.setRenderStates(markStates);
    draw(spin, body);
    device.setRenderStates(outlineStates);
    draw(Matrix4x4.multiply(spin, Matrix4x4.scaling(new Vector3(width, width, width))), edge);
  });
  if (stage.bar) {
    slider(stage.bar, 'outline scale', [1, 1.5, 0.01], width, (v) => (width = v));
  } else {
    stage.caption('stencil: replace, then not-equal');
  }
  myApp.run();
});
