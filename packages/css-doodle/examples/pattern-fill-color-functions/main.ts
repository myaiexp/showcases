// Fill: CSS color functions read as channels inside an expression
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "oklch mix", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 64;
          fill: mix(oklch(.75 .15 60), oklch(.45 .2 280), y / 64);
        );
      ` },
    { label: "hex mix", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 64;
          fill: mix(#f9c74f, #277da1, y / 64);
        );
      ` },
    { label: "hsl 0 to 1", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 64;
          fill: hsl(y / 64, .7, .55);
        );
      ` },
    { label: "named colors", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 64;
          fill: mix(gold, tomato, x / 64);
        );
      ` },
  ],
  say: "Both ends of the mix are plain CSS colors",
});
