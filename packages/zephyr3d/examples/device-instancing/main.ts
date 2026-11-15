// Instanced drawing: one cube mesh, per-instance offset and colour buffers with stepMode 'instance'
import { DEPTH_CLEAR_VALUE, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { cubeData, stateSet, viewProjection } from '../../shared/device-kit.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const device = myApp.device;

  // The cube's own vertices, stepped per vertex ...
  const cube = cubeData(0.35);
  // ... and one offset (xyz) + hue (w) and one colour per instance, stepped per instance
  const side = 9;
  const offsets: number[] = [];
  const colors: number[] = [];
  for (let z = 0; z < side; z++) {
    for (let x = 0; x < side; x++) {
      offsets.push((x - (side - 1) / 2) * 1.0, 0, (z - (side - 1) / 2) * 1.0, (x + z) * 0.5);
      colors.push(x / (side - 1), 0.4 + 0.4 * Math.sin(z), 1 - x / (side - 1), 1);
    }
  }
  const layout = device.createVertexLayout({
    vertexBuffers: [
      { buffer: device.createVertexBuffer('position_f32x3', new Float32Array(cube.pos))! },
      { buffer: device.createVertexBuffer('normal_f32x3', new Float32Array(cube.nor))! },
      { buffer: device.createVertexBuffer('tex1_f32x4', new Float32Array(offsets))!, stepMode: 'instance' },
      { buffer: device.createVertexBuffer('tex2_f32x4', new Float32Array(colors))!, stepMode: 'instance' },
    ],
    indexBuffer: device.createIndexBuffer(new Uint16Array(cube.idx)),
  });

  const program = device.buildRenderProgram({
    vertex(pb) {
      this.$inputs.pos = pb.vec3().attrib('position');
      this.$inputs.normal = pb.vec3().attrib('normal');
      this.$inputs.offset = pb.vec4().attrib('texCoord1');
      this.$inputs.color = pb.vec4().attrib('texCoord2');
      this.mvp = pb.mat4().uniform(0);
      this.time = pb.float().uniform(0);
      this.$outputs.color = pb.vec4();
      this.$outputs.normal = pb.vec3();
      pb.main(function () {
        // Each instance bobs on its own phase (offset.w)
        this.$l.lift = pb.mul(0.6, pb.sin(pb.add(this.time, this.$inputs.offset.w)));
        this.$l.world = pb.add(this.$inputs.pos, pb.vec3(this.$inputs.offset.x, pb.add(this.$inputs.offset.y, this.lift), this.$inputs.offset.z));
        this.$builtins.position = pb.mul(this.mvp, pb.vec4(this.world, 1));
        this.$outputs.color = this.$inputs.color;
        this.$outputs.normal = this.$inputs.normal;
      });
    },
    fragment(pb) {
      this.$outputs.outColor = pb.vec4();
      pb.main(function () {
        this.$l.lit = pb.add(0.3, pb.mul(0.7, pb.max(pb.dot(pb.normalize(this.$inputs.normal), pb.normalize(pb.vec3(0.4, 1, 0.5))), 0)));
        this.$outputs.outColor = pb.vec4(pb.mul(this.$inputs.color.rgb, this.lit), 1);
      });
    },
  })!;
  const bindGroup = device.createBindGroup(program.bindGroupLayouts[0]!);
  const states = stateSet(device, 'back');
  const clear = new Vector4(0.06, 0.08, 0.12, 1);
  let count = side * side;

  myApp.on('tick', (_dt, ms) => {
    bindGroup.setValue('mvp', viewProjection(device, ms * 0.0003, 9, 6));
    bindGroup.setValue('time', ms * 0.002);
    device.clearFrameBuffer(clear, DEPTH_CLEAR_VALUE, 0);
    device.setVertexLayout(layout);
    device.setRenderStates(states);
    device.setProgram(program);
    device.setBindGroup(0, bindGroup);
    // One call, `count` cubes
    device.drawInstanced('triangle-list', 0, cube.idx.length, count);
  });
  if (stage.bar) {
    slider(stage.bar, 'instances', [1, side * side, 1], count, (v) => (count = v));
  } else {
    stage.caption(`drawInstanced(triangle-list, 0, 36, ${count})`);
  }
  myApp.run();
});
