// match: tests combine with and, or and not
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "and", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 24;
          fill: #1b2a41;
          match(x > 6 and x < 19 and y > 6 and y < 19) {
            fill: #fc0;
          }
        );
      ` },
    { label: "or", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 24;
          fill: #1b2a41;
          match(x < 4 or y < 4 or x > 21 or y > 21) {
            fill: #fc0;
          }
        );
      ` },
    { label: "not", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 24;
          fill: #1b2a41;
          match(not (x % 4 = 0 or y % 4 = 0)) {
            fill: #fc0;
          }
        );
      ` },
  ],
  say: "One test, three ways of putting conditions together",
});
