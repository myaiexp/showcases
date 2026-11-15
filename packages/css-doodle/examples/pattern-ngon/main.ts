// ngon(p, n): polygons as distances
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "ngon 3", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          fill: #14213d;
          repeat(4 as k) {
            fill: hsl(.1 + .12k, .8, .6), shape(abs(ngon(rot(pos, .4t * (k + 1)), 3) - .05 - .05k), .012);
          }
        );
      ` },
    { label: "ngon 5", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          fill: #14213d;
          repeat(4 as k) {
            fill: hsl(.1 + .12k, .8, .6), shape(abs(ngon(rot(pos, .4t * (k + 1)), 5) - .05 - .05k), .012);
          }
        );
      ` },
    { label: "ngon 6", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          fill: #14213d;
          repeat(4 as k) {
            fill: hsl(.1 + .12k, .8, .6), shape(abs(ngon(rot(pos, .4t * (k + 1)), 6) - .05 - .05k), .012);
          }
        );
      ` },
    { label: "ngon 8", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          fill: #14213d;
          repeat(4 as k) {
            fill: hsl(.1 + .12k, .8, .6), shape(abs(ngon(rot(pos, .4t * (k + 1)), 8) - .05 - .05k), .012);
          }
        );
      ` },
  ],
  say: "ngon(p, n): the second argument is the number of sides",
});
