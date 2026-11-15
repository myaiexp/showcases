// A triangle on the raw device: two vertex buffers, a shader built in JavaScript, a uniform, draw()
import { DEPTH_CLEAR_VALUE, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const device = myApp.device;

  // Vertex data: a position and a colour per vertex, in separate buffers
  const positions = device.createVertexBuffer('position_f32x3', new Float32Array([0, 0.8, 0, -0.8, -0.6, 0, 0.8, -0.6, 0]))!;
  const colors = device.createVertexBuffer('diffuse_u8normx4', new Uint8Array([255, 60, 60, 255, 60, 255, 90, 255, 70, 120, 255, 255]))!;
  const layout = device.createVertexLayout({ vertexBuffers: [{ buffer: positions }, { buffer: colors }] });

  // The shader is JavaScript: vertex() and fragment() describe the GLSL (or WGSL) to generate
  const program = device.buildRenderProgram({
    vertex(pb) {
      this.$inputs.pos = pb.vec3().attrib('position');
      this.$inputs.color = pb.vec4().attrib('diffuse');
      this.angle = pb.float().uniform(0);
      // A varying: written here, read as an input by the fragment shader
      this.$outputs.outColor = pb.vec4();
      pb.main(function () {
        this.$l.c = pb.cos(this.angle);
        this.$l.s = pb.sin(this.angle);
        this.$l.p = pb.vec2(
          pb.sub(pb.mul(this.$inputs.pos.x, this.c), pb.mul(this.$inputs.pos.y, this.s)),
          pb.add(pb.mul(this.$inputs.pos.x, this.s), pb.mul(this.$inputs.pos.y, this.c)),
        );
        this.$builtins.position = pb.vec4(this.p, 0, 1);
        this.$outputs.outColor = this.$inputs.color;
      });
    },
    fragment(pb) {
      this.$outputs.color = pb.vec4();
      pb.main(function () {
        this.$outputs.color = this.$inputs.outColor;
      });
    },
  })!;
  // Uniforms travel in a bind group made from the program's own layout
  const bindGroup = device.createBindGroup(program.bindGroupLayouts[0]!);

  let angle = 0;
  let speed = 1;
  const clear = new Vector4(0.06, 0.08, 0.12, 1);
  myApp.on('tick', (dt) => {
    angle += dt * 0.001 * speed;
    bindGroup.setValue('angle', angle);
    device.clearFrameBuffer(clear, DEPTH_CLEAR_VALUE, 0);
    device.setVertexLayout(layout);
    device.setProgram(program);
    device.setBindGroup(0, bindGroup);
    device.draw('triangle-list', 0, 3);
  });
  if (stage.bar) {
    slider(stage.bar, 'angular speed', [-4, 4, 0.1], 1, (v) => (speed = v));
  } else {
    stage.caption('draw(triangle-list, 0, 3)');
  }
  myApp.run();
});
