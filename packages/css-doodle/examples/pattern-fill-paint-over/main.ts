// Fill: a later fill paints over the one before
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "no fill is transparent", code: `
        @grid: 1 / 100% / #1b2a41;
        @content: @pattern(
          grid: 10;
          match((x + y) % 2 = 0) {
            fill: #fc0;
          }
        );
      ` },
    { label: "opaque replaces", code: `
        @grid: 1 / 100% / #1b2a41;
        @content: @pattern(
          grid: 10;
          fill: #0cf;
          match((x + y) % 2 = 0) {
            fill: #fc0;
          }
        );
      ` },
    { label: "alpha tints", code: `
        @grid: 1 / 100% / #1b2a41;
        @content: @pattern(
          grid: 10;
          fill: #fc0;
          fill: #f06, .5;
          match((x + y) % 2 = 0) {
            fill: #0cf, .5;
          }
        );
      ` },
  ],
  say: "Rules run in source order, so the last fill wins unless it is see-through",
});
