// Halftone: dot size from a field, with shape: circle and size
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100% / #14213d;
    @content: @pattern(
      grid: 24;
      shape: circle;
      size: clamp(1.4 * fbm(uv * 3 + vec2(t * .2, 0)), 0, 1);
      fill: #fca311;
    );
  `,
  reroll: true,
  say: "Bigger dots where the noise is high",
});
