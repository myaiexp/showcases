// Image sizes: @pattern, @pattern48 and @pattern64x36
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "@pattern", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          n: fbm(uv * 6 + vec2(t * .3, 0));
          fill: ramp(n, #0b132b, #3a86ff, #ffbe0b, #fff);
        );
      ` },
    { label: "@pattern64x36", code: `
        @grid: 1 / 100%;
        @content: @pattern64x36(
          n: fbm(uv * 6 + vec2(t * .3, 0));
          fill: ramp(n, #0b132b, #3a86ff, #ffbe0b, #fff);
        );
      ` },
    { label: "@pattern24x14", code: `
        @grid: 1 / 100%;
        @content: @pattern24x14(
          n: fbm(uv * 6 + vec2(t * .3, 0));
          fill: ramp(n, #0b132b, #3a86ff, #ffbe0b, #fff);
        );
      ` },
  ],
  frame: "wide",
  say: "The same rules at three image sizes",
});
