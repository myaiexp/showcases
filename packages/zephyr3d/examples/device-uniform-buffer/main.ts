// A uniform buffer: a 16-colour palette array in the shader, updated slot by slot with bufferSubData
import { DEPTH_CLEAR_VALUE, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { PBStructTypeInfo } from '@zephyr3d/device';
import { Application } from '@zephyr3d/scene';
import { button } from '../../shared/controls.ts';
import { drawScreen, quadGeometry, screenProgram, stateSet } from '../../shared/device-kit.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const device = myApp.device;

  const quad = quadGeometry(device, 1);
  const { program, bindGroup } = screenProgram(device, function (pb) {
    // 16 vec4 in one uniform buffer, bind group 0
    this.palette = pb.vec4[16]!().uniformBuffer(0);
    this.$outputs.color = pb.vec4();
    pb.main(function () {
      this.$l.cell = pb.ivec2(pb.floor(pb.mul(this.$inputs.uv, 4)));
      this.$l.index = pb.add(pb.mul(this.cell.y, 4), this.cell.x);
      this.$outputs.color = this.palette.at(this.index);
    });
  });

  // The buffer's type comes from the program's own binding info
  const bufferType = program.getBindingInfo('palette')!.type as PBStructTypeInfo;
  const buffer = device.createStructuredBuffer(bufferType, { usage: 'uniform' });
  bindGroup.setBuffer('palette', buffer);
  stage.own(() => buffer.dispose());

  const colors = new Float32Array(16 * 4);
  const setSlot = (slot: number, hue: number): void => {
    const c = [0.5 + 0.5 * Math.cos(hue), 0.5 + 0.5 * Math.cos(hue + 2.1), 0.5 + 0.5 * Math.cos(hue + 4.2), 1];
    colors.set(c, slot * 4);
    // Write 4 floats at byte offset slot * 16
    buffer.bufferSubData(slot * 16, new Float32Array(c));
  };
  for (let i = 0; i < 16; i++) setSlot(i, i * 0.4);

  const states = stateSet(device, 'none', false);
  const clear = new Vector4(0, 0, 0, 1);
  let last = -1;
  myApp.on('tick', (_dt, ms) => {
    // One slot changes every 150 ms, the rest of the buffer is left alone
    const step = Math.floor(ms / 150);
    if (step !== last) {
      last = step;
      setSlot(step % 16, step * 0.37);
    }
    device.clearFrameBuffer(clear, DEPTH_CLEAR_VALUE, 0);
    drawScreen(device, quad, program, bindGroup, states);
  });
  if (stage.bar) {
    button(stage.bar, 'shuffle every slot', () => {
      for (let i = 0; i < 16; i++) setSlot(i, Math.sin(i * 12.9898 + performance.now()) * 6);
    });
  } else {
    stage.caption('bufferSubData(slot * 16, vec4) every 150 ms');
  }
  myApp.run();
});
