// Grid and fill: a Sierpinski triangle from a bitwise test
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "16 × 16", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 16;
          fill: #fff;
          match((x - 1) & (y - 1)) {
            fill: #000;
          }
        );
      ` },
    { label: "32 × 32", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 32;
          fill: #fff;
          match((x - 1) & (y - 1)) {
            fill: #000;
          }
        );
      ` },
    { label: "64 × 64", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 64;
          fill: #fff;
          match((x - 1) & (y - 1)) {
            fill: #000;
          }
        );
      ` },
  ],
  say: "Each cell knows its column x and row y, counted from 1",
});
