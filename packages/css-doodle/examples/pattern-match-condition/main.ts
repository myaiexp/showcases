// match: rules that only run where a test holds
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "< 12", code: `
        @grid: 1 / 100% / #fff;
        @content: @pattern(
          grid: 119;
          match(x*x*y*y % 120 < 12) {
            fill: #000
          }
        );
      ` },
    { label: "< 24", code: `
        @grid: 1 / 100% / #fff;
        @content: @pattern(
          grid: 119;
          match(x*x*y*y % 120 < 24) {
            fill: #000
          }
        );
      ` },
    { label: "< 48", code: `
        @grid: 1 / 100% / #fff;
        @content: @pattern(
          grid: 119;
          match(x*x*y*y % 120 < 48) {
            fill: #000
          }
        );
      ` },
    { label: "< 72", code: `
        @grid: 1 / 100% / #fff;
        @content: @pattern(
          grid: 119;
          match(x*x*y*y % 120 < 72) {
            fill: #000
          }
        );
      ` },
  ],
  say: "The test is plain math on the cell's x and y",
});
