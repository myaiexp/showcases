// escape(c): the Mandelbrot set in one call
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "the whole set", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          n: escape(3pos - vec2(.7, 0));
          fill: -cos(2π(min(3n, 1) + vec3(0, .1, .2)));
        );
      ` },
    { label: "zooming in", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          n: escape(vec2(-.72, .3) + pos * (.35 + .3sin(.5t)));
          fill: -cos(2π(min(3n, 1) + vec3(0, .1, .2)));
        );
      ` },
  ],
  say: "escape is 0 where the point never leaves, else how soon it does",
});
