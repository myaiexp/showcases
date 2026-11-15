// Swizzle on the left: writing only some channels of a vector
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      c: vec3(uv, .5);
      c.z: .5 + .5sin(t);
      match(uv.x > .5) {
        c.xy: c.yx;
      }
      fill: c;
    );
  `,
  say: "Left half: red from x. Right half: channels swapped",
});
