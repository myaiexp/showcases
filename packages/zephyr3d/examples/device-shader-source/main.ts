// The generated shader source and two bind groups: the docs' mvp / texture / factor program on a quad
import { DEPTH_CLEAR_VALUE, Matrix4x4, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application } from '@zephyr3d/scene';
import { color, select } from '../../shared/controls.ts';
import { checkerPixels, quadGeometry, viewProjection } from '../../shared/device-kit.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const device = myApp.device;

  // The program from the docs' "Writing shaders" page; here tex and factor sit in bind group 1
  const program = device.buildRenderProgram({
    vertex(pb) {
      this.$inputs.pos = pb.vec3().attrib('position');
      this.$inputs.uv = pb.vec2().attrib('texCoord0');
      this.mvpMatrix = pb.mat4().uniform(0);
      pb.main(function () {
        this.$builtins.position = pb.mul(this.mvpMatrix, pb.vec4(this.$inputs.pos, 1));
        this.$outputs.outUV = this.$inputs.uv;
      });
    },
    fragment(pb) {
      this.$outputs.color = pb.vec4();
      this.tex = pb.tex2D().uniform(1);
      this.factor = pb.vec4().uniform(1);
      pb.main(function () {
        this.sampleColor = pb.textureSample(this.tex, this.$inputs.outUV);
        this.$outputs.color = pb.mul(this.sampleColor, this.factor);
      });
    },
  })!;

  // One bind group per group index the shader uses
  const bindgroup0 = device.createBindGroup(program.bindGroupLayouts[0]!);
  const bindgroup1 = device.createBindGroup(program.bindGroupLayouts[1]!);
  const texture = device.createTexture2D('rgba8unorm', 8, 8, {
    samplerOptions: { magFilter: 'nearest', minFilter: 'nearest', mipFilter: 'none', addressU: 'repeat', addressV: 'repeat' },
  })!;
  texture.update(checkerPixels(8, 1, [255, 255, 255], [90, 100, 130]), 0, 0, 8, 8);
  const factor = new Vector4(1, 0.8, 0.4, 1);
  bindgroup1.setValue('factor', factor);
  bindgroup1.setTexture('tex', texture);

  const quad = quadGeometry(device, 1.4);
  const clear = new Vector4(0.06, 0.08, 0.12, 1);
  myApp.on('tick', (_dt, ms) => {
    const mvp = Matrix4x4.multiply(viewProjection(device, 0, 4, 0), Matrix4x4.rotationY(Math.sin(ms * 0.001) * 0.9));
    bindgroup0.setValue('mvpMatrix', mvp);
    device.clearFrameBuffer(clear, DEPTH_CLEAR_VALUE, 0);
    device.setVertexLayout(quad.layout);
    device.setProgram(program);
    device.setBindGroup(0, bindgroup0);
    device.setBindGroup(1, bindgroup1);
    device.draw('triangle-strip', 0, 4);
  });

  if (stage.bar) {
    const out = stage.readout()!;
    const show = (stageName: 'vertex' | 'fragment'): void => {
      out.textContent = `// program.getShaderSource('${stageName}')\n${program.getShaderSource(stageName)}`;
    };
    show('vertex');
    select(stage.bar, 'getShaderSource', ['vertex', 'fragment'] as const, 'vertex', show);
    color(stage.bar, 'factor (group 1)', '#ffcc66', (r, g, b) => {
      factor.setXYZW(r, g, b, 1);
      bindgroup1.setValue('factor', factor);
    });
  } else {
    stage.caption('mvpMatrix in group 0, tex and factor in group 1');
  }
  myApp.run();
});
