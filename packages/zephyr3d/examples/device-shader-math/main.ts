// Builtin shader functions plotted: pick sin, fract, smoothStep and friends and see y = f(k * x)
import { DEPTH_CLEAR_VALUE, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { PBShaderExp, ProgramBuilder } from '@zephyr3d/device';
import { Application } from '@zephyr3d/scene';
import { select, slider } from '../../shared/controls.ts';
import { drawScreen, quadGeometry, screenProgram, stateSet } from '../../shared/device-kit.ts';
import { zephyrExample } from '../../shared/frame.ts';

// Each entry builds one expression of the float x; the names are the docs' builtin functions
const FUNCTIONS: Record<string, (pb: ProgramBuilder, x: PBShaderExp) => PBShaderExp> = {
  'sin(x)': (pb, x) => pb.sin(x),
  'cos(x)': (pb, x) => pb.cos(x),
  'abs(x)': (pb, x) => pb.abs(x),
  'fract(x)': (pb, x) => pb.fract(x),
  'floor(x)': (pb, x) => pb.floor(x),
  'sign(x)': (pb, x) => pb.sign(x),
  'step(0, x)': (pb, x) => pb.step(0, x),
  'smoothStep(-1, 1, x)': (pb, x) => pb.smoothStep(-1, 1, x),
  'clamp(x, -0.5, 0.5)': (pb, x) => pb.clamp(x, -0.5, 0.5),
  'pow(abs(x), 2)': (pb, x) => pb.pow(pb.abs(x), 2),
  'sqrt(abs(x))': (pb, x) => pb.sqrt(pb.abs(x)),
  'exp(x) - 1': (pb, x) => pb.sub(pb.exp(x), 1),
  'tanh(x)': (pb, x) => pb.tanh(x),
  'mix(-1, 1, fract(x))': (pb, x) => pb.mix(-1, 1, pb.fract(x)),
};

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const device = myApp.device;
  const quad = quadGeometry(device, 1);
  const states = stateSet(device, 'none', false);
  const clear = new Vector4(0, 0, 0, 1);

  const build = (name: string) =>
    screenProgram(device, function (pb) {
      this.k = pb.float().uniform(0);
      this.$outputs.color = pb.vec4();
      pb.main(function () {
        // The screen covers x and y in [-2, 2]
        this.$l.p = pb.sub(pb.mul(this.$inputs.uv, 4), pb.vec2(2));
        this.$l.y = FUNCTIONS[name]!(pb, pb.mul(this.k, this.p.x));
        // Distance from this pixel to the curve (vertically), the axes, and a unit grid
        this.$l.curve = pb.sub(1, pb.smoothStep(0.02, 0.045, pb.abs(pb.sub(this.p.y, this.y))));
        this.$l.axes = pb.sub(1, pb.smoothStep(0.0, 0.015, pb.min(pb.abs(this.p.x), pb.abs(this.p.y))));
        this.$l.grid = pb.sub(1, pb.smoothStep(0.0, 0.012, pb.min(pb.abs(pb.sub(pb.fract(pb.add(this.p.x, 0.5)), 0.5)), pb.abs(pb.sub(pb.fract(pb.add(this.p.y, 0.5)), 0.5)))));
        this.$l.base = pb.add(pb.vec3(0.05, 0.07, 0.11), pb.mul(pb.vec3(0.08), this.grid));
        this.$l.withAxes = pb.mix(this.base, pb.vec3(0.5, 0.55, 0.65), this.axes);
        this.$outputs.color = pb.vec4(pb.mix(this.withAxes, pb.vec3(1, 0.75, 0.25), this.curve), 1);
      });
    });

  const names = Object.keys(FUNCTIONS);
  const programs = new Map<string, ReturnType<typeof build>>();
  let current = names[0]!;
  let k = 1;
  myApp.on('tick', (_dt, ms) => {
    if (!stage.bar) current = names[Math.floor(ms / 1500) % names.length]!;
    if (!programs.has(current)) programs.set(current, build(current));
    const p = programs.get(current)!;
    p.bindGroup.setValue('k', stage.bar ? k : 1 + 0.5 * Math.sin(ms * 0.001));
    device.clearFrameBuffer(clear, DEPTH_CLEAR_VALUE, 0);
    drawScreen(device, quad, p.program, p.bindGroup, states);
    device.setFont('15px monospace');
    device.drawText(`y = ${current.replace('x', 'k * x')}`, 8, 6, '#ffffff');
  });
  if (stage.bar) {
    select(stage.bar, 'function', names, current, (v) => (current = v));
    slider(stage.bar, 'k', [0.2, 4, 0.05], k, (v) => (k = v));
  } else {
    stage.caption('builtin functions, plotted');
  }
  myApp.run();
});
