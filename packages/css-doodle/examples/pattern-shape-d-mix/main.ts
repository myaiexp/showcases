// shape(d, size) for layering: mixing discs with mix()
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      c: #14213d;
      c: mix(c, #e63946, shape(length(pos - vec2(-.12, .05)), .6 + .1sin(t)));
      c: mix(c, #fca311, shape(length(pos - vec2(.12, .05)), .6 + .1cos(t)));
      c: mix(c, #2a9d8f, shape(length(pos - vec2(0, -.15)), .5 + .1sin(t + 2)));
      fill: c;
    );
  `,
  say: "Each layer is a mix toward its color by a 0 to 1 mask",
});
