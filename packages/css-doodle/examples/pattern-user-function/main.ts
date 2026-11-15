// A user function with a result: --name(params): { … }
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    --noise2(p): {
      i: floor(p);
      f: fract(p);
      result: mix(rand(i), rand(i + vec2(1, 0)), f.x);
    };
    @content: @pattern(
      fill: $noise2(uv * 8 + t) * $noise2(uv * 3);
    );
  `,
  say: "The body runs before the statement that calls it",
});
