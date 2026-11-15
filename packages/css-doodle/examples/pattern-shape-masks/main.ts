// shape: square, circle, diamond or none
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "square", code: `
        @grid: 1 / 100% / #0b132b;
        @content: @pattern(
          grid: 8;
          shape: square;
          size: .85;
          fill: hsl(i / I, .75, .6);
        );
      ` },
    { label: "circle", code: `
        @grid: 1 / 100% / #0b132b;
        @content: @pattern(
          grid: 8;
          shape: circle;
          size: .85;
          fill: hsl(i / I, .75, .6);
        );
      ` },
    { label: "diamond", code: `
        @grid: 1 / 100% / #0b132b;
        @content: @pattern(
          grid: 8;
          shape: diamond;
          size: .85;
          fill: hsl(i / I, .75, .6);
        );
      ` },
    { label: "none", code: `
        @grid: 1 / 100% / #0b132b;
        @content: @pattern(
          grid: 8;
          shape: none;
          size: .85;
          fill: hsl(i / I, .75, .6);
        );
      ` },
  ],
  say: "shape picks the outline, size scales it",
});
