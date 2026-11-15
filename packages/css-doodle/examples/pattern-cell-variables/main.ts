// Cell variables: x, y, i and their totals X, Y, I
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "x / X", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 16;
          fill: x / X;
        );
      ` },
    { label: "y / Y", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 16;
          fill: y / Y;
        );
      ` },
    { label: "i / I", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 16;
          fill: i / I;
        );
      ` },
    { label: "all three", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 16;
          fill: x / X, y / Y, i / I;
        );
      ` },
  ],
  say: "Row 1 is at the top, and cells count left to right",
});
