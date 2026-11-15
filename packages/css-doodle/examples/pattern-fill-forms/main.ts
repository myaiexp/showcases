// Fill forms: a gray, vec3, vec4, a list of channels or a color
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "a number is gray", code: `
        @grid: 1 / 100% / #1b2a41;
        @content: @pattern(
          grid: 12;
          fill: x / X;
        );
      ` },
    { label: "a CSS color", code: `
        @grid: 1 / 100% / #1b2a41;
        @content: @pattern(
          grid: 12;
          fill: #f06;
        );
      ` },
    { label: "vec3", code: `
        @grid: 1 / 100% / #1b2a41;
        @content: @pattern(
          grid: 12;
          fill: vec3(x / X, y / Y, .5);
        );
      ` },
    { label: "a list of channels", code: `
        @grid: 1 / 100% / #1b2a41;
        @content: @pattern(
          grid: 12;
          fill: x / X, y / Y, .5;
        );
      ` },
    { label: "vec4 with alpha", code: `
        @grid: 1 / 100% / #1b2a41;
        @content: @pattern(
          grid: 12;
          fill: vec4(1, .75, 0, x / X);
        );
      ` },
  ],
  say: "Five ways to write the same one line: fill",
});
