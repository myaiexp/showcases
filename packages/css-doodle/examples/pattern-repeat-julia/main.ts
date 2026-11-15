// repeat(n, stop): iterating a Julia set
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "c = (-.8, .156)", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          z: 2.8pos;
          c: vec2(-.8, .156);
          n: 0;
          repeat(96, dot(z, z) > 256) {
            z: vec2(z.x * z.x - z.y * z.y, 2 * z.x * z.y) + c;
            n: n + 1;
          }
          fill: match(n = 96, #000, hsl(n / 96, .75, .45));
        );
      ` },
    { label: "c moving", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          z: 2.8pos;
          c: .7885 * vec2(cos(.4t), sin(.4t));
          n: 0;
          repeat(96, dot(z, z) > 256) {
            z: vec2(z.x * z.x - z.y * z.y, 2 * z.x * z.y) + c;
            n: n + 1;
          }
          fill: match(n = 96, #000, hsl(n / 96, .75, .45));
        );
      ` },
  ],
  say: "The loop stops early where z has already left",
});
