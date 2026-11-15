// Operator shortcuts: 2t, **, a < b < c, ≠, and hsl without commas
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "2t and 2π", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 24;
          fill: .5 + .5sin(2π * x / X - 2t);
        );
      ` },
    { label: "x ** 2", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 24;
          match((x - 12.5) ** 2 + (y - 12.5) ** 2 < 100 + 30sin(t)) {
            fill: #fff;
          }
        );
      ` },
    { label: "a < b < c", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 24;
          match(8 < x < 17 and 8 < y < 17) {
            fill: #fff;
          }
        );
      ` },
    { label: "≠", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 24;
          match(x ≠ y and x + y ≠ 25) {
            fill: #fff;
          }
        );
      ` },
    { label: "hsl(h s l)", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 24;
          fill: hsl(x / X + .1t .75 .65);
        );
      ` },
  ],
  say: "Short forms for the GLSL you would otherwise write",
});
