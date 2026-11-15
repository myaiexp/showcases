// Shader functions and structs: pb.func with a return value, an overload, inout parameters, defineStruct
import { DEPTH_CLEAR_VALUE, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { drawScreen, quadGeometry, screenProgram, stateSet } from '../../shared/device-kit.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const device = myApp.device;
  const quad = quadGeometry(device, 1);

  const { program, bindGroup } = screenProgram(device, function (pb) {
    this.time = pb.float().uniform(0);
    this.radius = pb.float().uniform(0);
    this.$outputs.color = pb.vec4();

    // A function with a return value; the return type is inferred
    pb.func('rotate2', [pb.vec2('p'), pb.float('a')], function () {
      this.$l.c = pb.cos(this.a);
      this.$l.s = pb.sin(this.a);
      this.$return(pb.vec2(pb.sub(pb.mul(this.p.x, this.c), pb.mul(this.p.y, this.s)), pb.add(pb.mul(this.p.x, this.s), pb.mul(this.p.y, this.c))));
    });
    // Two overloads of one name: a float picks a rainbow, a vec3 is pushed towards its brightest channel
    pb.func('palette', [pb.float('t')], function () {
      this.$return(pb.add(0.5, pb.mul(0.5, pb.cos(pb.mul(6.28318, pb.add(pb.vec3(this.t), pb.vec3(0, 0.33, 0.67)))))));
    });
    pb.func('palette', [pb.vec3('c')], function () {
      this.$return(pb.mul(this.c, pb.div(1, pb.max(pb.max(this.c.x, this.c.y), pb.max(this.c.z, 0.001)))));
    });
    // inout parameters: after the call a <= b
    pb.func('order', [pb.float('a').inout(), pb.float('b').inout()], function () {
      this.$if(pb.greaterThan(this.a, this.b), function () {
        this.$l.tmp = this.a;
        this.a = this.b;
        this.b = this.tmp;
      });
    });
    // A struct type, then instances of it
    const Ring = pb.defineStruct([pb.vec3('color'), pb.float('radius')]);

    pb.main(function () {
      this.$l.p = pb.mul(pb.sub(this.$inputs.uv, pb.vec2(0.5)), 2);
      this.$l.q = this.rotate2(this.p, this.time);
      this.$l.ring = Ring(pb.vec3(1, 0.9, 0.4), this.radius);
      // Hand order() the two edges in the wrong order on purpose
      this.$l.lo = pb.mul(this.ring.radius, 1.1);
      this.$l.hi = pb.mul(this.ring.radius, 0.9);
      this.order(this.lo, this.hi);
      this.$l.k = pb.smoothStep(this.lo, this.hi, pb.length(this.p));
      this.$l.inner = this.palette(pb.add(pb.mul(this.q.x, 0.5), pb.mul(this.time, 0.2)));
      this.$l.outer = this.palette(pb.vec3(pb.add(this.q.x, 1.2), pb.add(this.q.y, 1.2), 0.5));
      this.$l.edge = pb.clamp(pb.sub(1, pb.mul(20, pb.abs(pb.sub(pb.length(this.p), this.ring.radius)))), 0, 1);
      this.$outputs.color = pb.vec4(pb.add(pb.mix(this.inner, pb.mul(this.outer, 0.35), this.k), pb.mul(this.ring.color, this.edge)), 1);
    });
  });

  const states = stateSet(device, 'none', false);
  const clear = new Vector4(0, 0, 0, 1);
  let radius = 0.6;
  myApp.on('tick', (_dt, ms) => {
    bindGroup.setValue('time', ms * 0.0007);
    bindGroup.setValue('radius', stage.bar ? radius : 0.6 + 0.2 * Math.sin(ms * 0.001));
    device.clearFrameBuffer(clear, DEPTH_CLEAR_VALUE, 0);
    drawScreen(device, quad, program, bindGroup, states);
  });
  if (stage.bar) {
    slider(stage.bar, 'ring radius (struct member)', [0.2, 1.2, 0.01], radius, (v) => (radius = v));
  } else {
    stage.caption('pb.func, overloads, inout and defineStruct');
  }
  myApp.run();
});
