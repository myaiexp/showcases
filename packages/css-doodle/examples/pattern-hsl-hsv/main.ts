// hsl(h, s, l) and hsv(h, s, v), with spaces for commas
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "hsv(h .9 1)", code: `
        @grid: 1 / 100% / #0b132b;
        @content: @pattern(
          h: fract(atan(pos.y, pos.x) / (2π) + .15t);
          fill: hsv(h, length(pos) * 2, 1), shape(length(pos) - .48);
        );
      ` },
    { label: "hsl(h 1 l)", code: `
        @grid: 1 / 100% / #0b132b;
        @content: @pattern(
          h: fract(atan(pos.y, pos.x) / (2π) + .15t);
          fill: hsl(h, 1, 1 - length(pos) * 1.1), shape(length(pos) - .48);
        );
      ` },
  ],
  say: "Both read channels from 0 to 1, not degrees",
});
