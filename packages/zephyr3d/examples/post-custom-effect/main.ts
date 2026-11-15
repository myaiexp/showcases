// A custom AbstractPostEffect appended to camera.compositor: a tint, vignette and scanlines pass
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { BindGroup, GPUProgram, Texture2D } from '@zephyr3d/device';
import { AbstractPostEffect, Application, fetchSampler, linearToGamma, Mesh, Scene, SphereShape, type DrawContext } from '@zephyr3d/scene';
import { color, slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera, pbr, sunAndFloor } from '../../shared/post-scene.ts';

/** A full-screen pass: it samples the previous result and writes a tinted, vignetted, scanlined version. */
class TintVignette extends AbstractPostEffect {
  private static program: GPUProgram | null = null;
  private static bindGroup: BindGroup | null = null;
  readonly tint = new Vector3(1, 0.6, 0.3);
  strength = 0.6;
  time = 0;
  // This pass reads only the colour it is handed
  override requireLinearDepthTexture(): boolean {
    return false;
  }
  override requireDepthAttachment(): boolean {
    return false;
  }
  override apply(ctx: DrawContext, inputColorTexture: Texture2D, _sceneDepthTexture: Texture2D, srgbOutput: boolean): void {
    const device = ctx.device;
    if (!TintVignette.program) {
      TintVignette.program = device.buildRenderProgram({
        vertex(pb) {
          this.flip = pb.int().uniform(0);
          this.$inputs.pos = pb.vec2().attrib('position');
          this.$outputs.uv = pb.vec2();
          pb.main(function () {
            this.$builtins.position = pb.vec4(this.$inputs.pos, 0, 1);
            this.$outputs.uv = pb.add(pb.mul(this.$inputs.pos.xy, 0.5), pb.vec2(0.5));
            this.$if(pb.notEqual(this.flip, 0), function () {
              this.$builtins.position.y = pb.neg(this.$builtins.position.y);
            });
          });
        },
        fragment(pb) {
          this.srcTex = pb.tex2D().sampleType('unfilterable-float').uniform(0);
          this.tint = pb.vec3().uniform(0);
          this.strength = pb.float().uniform(0);
          this.time = pb.float().uniform(0);
          this.srgbOut = pb.int().uniform(0);
          this.$outputs.outColor = pb.vec4();
          pb.main(function () {
            this.$l.src = pb.textureSample(this.srcTex, this.$inputs.uv);
            // 0 in the middle of the screen, 1 in the corners
            this.$l.edge = pb.smoothStep(0.25, 0.85, pb.distance(this.$inputs.uv, pb.vec2(0.5)));
            this.$l.lines = pb.add(0.9, pb.mul(0.1, pb.sin(pb.add(pb.mul(this.$inputs.uv.y, 500), this.time))));
            this.$l.tinted = pb.mix(this.src.rgb, pb.mul(this.src.rgb, this.tint), this.strength);
            this.$l.result = pb.mul(this.tinted, pb.sub(1, pb.mul(this.edge, this.strength)), this.lines);
            this.$if(pb.equal(this.srgbOut, 0), function () {
              this.$outputs.outColor = pb.vec4(this.result, this.src.a);
            }).$else(function () {
              this.$outputs.outColor = pb.vec4(linearToGamma(this, this.result), this.src.a);
            });
          });
        },
      })!;
      TintVignette.bindGroup = device.createBindGroup(TintVignette.program.bindGroupLayouts[0]!);
    }
    const bg = TintVignette.bindGroup!;
    bg.setTexture('srcTex', inputColorTexture, fetchSampler('clamp_nearest_nomip'));
    bg.setValue('flip', this.needFlip(device) ? 1 : 0);
    bg.setValue('tint', this.tint);
    bg.setValue('strength', this.strength);
    bg.setValue('time', this.time);
    bg.setValue('srgbOut', srgbOutput ? 1 : 0);
    device.setProgram(TintVignette.program);
    device.setBindGroup(0, bg);
    this.drawFullscreenQuad();
  }
}

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  scene.env.light.type = 'constant';
  scene.env.light.strength = 0.5;
  sunAndFloor(scene).intensity = 3;
  const balls = [0, 1, 2].map((i) => {
    const m = new Mesh(scene, new SphereShape({ radius: 1 }), pbr(0.3 + i * 0.3, 0.8 - i * 0.2, 0.9 - i * 0.3, 0, 0.4));
    m.position.setXYZ(-2.5 + i * 2.5, 1, 0);
    return m;
  });

  const camera = orbitCamera(scene, new Vector3(0, 3, 8), new Vector3(0, 1, 0));
  camera.toneMap = true;
  // The camera's own effects sit in its compositor; ours is appended after them
  const effect = new TintVignette();
  camera.compositor.appendPostEffect(effect);

  myApp.on('tick', (_dt, ms) => {
    effect.time = ms * 0.01;
    balls.forEach((b, i) => b.position.setXYZ(-2.5 + i * 2.5, 1 + 0.4 * Math.sin(ms * 0.002 + i), 0));
  });
  if (stage.bar) {
    toggle(stage.bar, 'effect.enabled', true, (v) => (effect.enabled = v));
    slider(stage.bar, 'strength', [0, 1, 0.05], effect.strength, (v) => (effect.strength = v));
    color(stage.bar, 'tint', '#ff994d', (r, g, b) => effect.tint.setXYZ(r, g, b));
  } else {
    stage.caption('a custom pass appended to camera.compositor');
  }
  myApp.run();
});
