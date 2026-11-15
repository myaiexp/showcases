// Shader loops: the same Julia iteration written with $for, $while and $do ... $while, plus $break
import { DEPTH_CLEAR_VALUE, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application } from '@zephyr3d/scene';
import { select } from '../../shared/controls.ts';
import { drawScreen, quadGeometry, screenProgram, stateSet } from '../../shared/device-kit.ts';
import { zephyrExample } from '../../shared/frame.ts';

type LoopKind = '$for' | '$while' | '$do / $while';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const device = myApp.device;
  const quad = quadGeometry(device, 1);
  const states = stateSet(device, 'none', false);
  const clear = new Vector4(0, 0, 0, 1);

  // One shader per loop style. Each iterates z = z^2 + c up to 64 times and counts the steps before escape
  const build = (kind: LoopKind) =>
    screenProgram(device, function (pb) {
      this.time = pb.float().uniform(0);
      this.$outputs.color = pb.vec4();
      // The loop body is the same in all three: one Julia step
      const step = (scope: typeof this): void => {
        scope.z = pb.add(
          pb.vec2(pb.sub(pb.mul(scope.z.x, scope.z.x), pb.mul(scope.z.y, scope.z.y)), pb.mul(2, pb.mul(scope.z.x, scope.z.y))),
          scope.c,
        );
      };
      pb.main(function () {
        this.$l.c = pb.mul(pb.vec2(pb.cos(this.time), pb.sin(this.time)), 0.7885);
        this.$l.z = pb.mul(pb.sub(this.$inputs.uv, pb.vec2(0.5)), 3);
        this.$l.n = pb.int(0);
        if (kind === '$for') {
          // for (int i = 0; i < 64; i++), leaving early with $break
          this.$for(pb.int('i'), 0, 64, function () {
            step(this);
            this.$if(pb.greaterThan(pb.dot(this.z, this.z), 4), function () {
              this.$break();
            });
            this.n = pb.add(this.n, 1);
          });
        } else if (kind === '$while') {
          this.$while(pb.lessThan(this.n, 64), function () {
            step(this);
            this.$if(pb.greaterThan(pb.dot(this.z, this.z), 4), function () {
              this.$break();
            });
            this.n = pb.add(this.n, 1);
          });
        } else {
          // The exit test comes after the body, in $while(...)
          this.$do(function () {
            step(this);
            this.n = pb.add(this.n, 1);
          }).$while(pb.and(pb.lessThan(this.n, 64), pb.lessThan(pb.dot(this.z, this.z), 4)));
        }
        this.$l.t = pb.div(pb.float(this.n), 64);
        this.$l.hue = pb.add(pb.vec3(this.t), pb.vec3(0, 0.33, 0.67));
        this.$outputs.color = pb.vec4(pb.mul(pb.add(0.5, pb.mul(0.5, pb.cos(pb.mul(6.28318, this.hue)))), pb.step(this.t, 0.999)), 1);
      });
    });

  const kinds: LoopKind[] = ['$for', '$while', '$do / $while'];
  const programs = new Map<LoopKind, ReturnType<typeof build>>();
  const get = (k: LoopKind): ReturnType<typeof build> => {
    if (!programs.has(k)) programs.set(k, build(k));
    return programs.get(k)!;
  };
  let kind: LoopKind = '$for';

  myApp.on('tick', (_dt, ms) => {
    if (!stage.bar) kind = kinds[Math.floor(ms / 2000) % 3]!;
    const p = get(kind);
    p.bindGroup.setValue('time', ms * 0.0004);
    device.clearFrameBuffer(clear, DEPTH_CLEAR_VALUE, 0);
    drawScreen(device, quad, p.program, p.bindGroup, states);
    device.setFont('14px monospace');
    device.drawText(`loop: ${kind}`, 8, 6, '#ffffff');
  });
  if (stage.bar) {
    select(stage.bar, 'loop', kinds, kind, (v) => (kind = v));
    stage.readout()!.textContent = 'All three loops draw the same picture. $for gives the loop variable, $while tests first, $do ... $while tests last; $break leaves early.';
  } else {
    stage.caption('$for, $while and $do generate the same image');
  }
  myApp.run();
});
