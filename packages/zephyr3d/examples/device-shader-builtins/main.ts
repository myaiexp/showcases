// Builtin variables: vertexIndex, instanceIndex, fragCoord and frontFacing in one instanced shader
import { DEPTH_CLEAR_VALUE, Matrix4x4, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application } from '@zephyr3d/scene';
import { toggle } from '../../shared/controls.ts';
import { quadGeometry, stateSet, viewProjection } from '../../shared/device-kit.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const device = myApp.device;
  const quad = quadGeometry(device, 0.9);
  const count = 5;

  const program = device.buildRenderProgram({
    vertex(pb) {
      this.$inputs.pos = pb.vec3().attrib('position');
      this.viewProj = pb.mat4().uniform(0);
      this.time = pb.float().uniform(0);
      this.$outputs.vertexColor = pb.vec3();
      pb.main(function () {
        // $builtins.instanceIndex: which copy this is (gl_InstanceID); each one sits further along x and turns a different way
        this.$l.inst = pb.float(this.$builtins.instanceIndex);
        this.$l.angle = pb.add(pb.mul(this.inst, 0.9), pb.mul(this.time, pb.add(0.6, pb.mul(this.inst, 0.2))));
        this.$l.local = pb.vec3(
          pb.mul(this.$inputs.pos.x, pb.cos(this.angle)),
          this.$inputs.pos.y,
          pb.mul(this.$inputs.pos.x, pb.sin(this.angle)),
        );
        this.$l.world = pb.add(this.local, pb.vec3(pb.mul(pb.sub(this.inst, 2), 2), 0, 0));
        this.$builtins.position = pb.mul(this.viewProj, pb.vec4(this.world, 1));
        // $builtins.vertexIndex: which vertex of the strip this is (gl_VertexID), turned into a corner colour
        this.$l.vid = pb.float(this.$builtins.vertexIndex);
        this.$outputs.vertexColor = pb.add(pb.vec3(0.3), pb.mul(0.35, pb.vec3(this.vid, pb.sub(3, this.vid), pb.mod(pb.mul(this.vid, 2), 3))));
      });
    },
    fragment(pb) {
      this.stripes = pb.float().uniform(0);
      this.$outputs.color = pb.vec4();
      pb.main(function () {
        // $builtins.fragCoord: the pixel position (gl_FragCoord), here cut into diagonal stripes
        this.$l.stripe = pb.mix(1, pb.step(0.5, pb.fract(pb.div(pb.add(this.$builtins.fragCoord.x, this.$builtins.fragCoord.y), 14))), this.stripes);
        this.$l.base = pb.mul(this.$inputs.vertexColor, pb.add(0.5, pb.mul(0.5, this.stripe)));
        // $builtins.frontFacing: false when we see the back of the quad, which turns blue
        this.$if(this.$builtins.frontFacing, function () {
          this.$outputs.color = pb.vec4(this.base, 1);
        }).$else(function () {
          this.$outputs.color = pb.vec4(pb.mul(pb.vec3(0.2, 0.35, 1), pb.add(0.4, pb.mul(0.6, pb.length(this.base)))), 1);
        });
      });
    },
  })!;
  const bindGroup = device.createBindGroup(program.bindGroupLayouts[0]!);
  // No culling, so both sides of each quad are drawn and frontFacing can tell them apart
  const states = stateSet(device, 'none', true);
  const clear = new Vector4(0.06, 0.08, 0.12, 1);
  let stripes = 1;

  myApp.on('tick', (_dt, ms) => {
    bindGroup.setValue('viewProj', Matrix4x4.multiply(viewProjection(device, 0, 6.5, 1.2), Matrix4x4.identity()));
    bindGroup.setValue('time', ms * 0.001);
    bindGroup.setValue('stripes', stripes);
    device.clearFrameBuffer(clear, DEPTH_CLEAR_VALUE, 0);
    device.setVertexLayout(quad.layout);
    device.setRenderStates(states);
    device.setProgram(program);
    device.setBindGroup(0, bindGroup);
    device.drawInstanced('triangle-strip', 0, 4, count);
  });
  if (stage.bar) {
    toggle(stage.bar, 'fragCoord stripes', true, (v) => (stripes = v ? 1 : 0));
  } else {
    stage.caption('vertexIndex, instanceIndex, fragCoord, frontFacing');
  }
  myApp.run();
});
