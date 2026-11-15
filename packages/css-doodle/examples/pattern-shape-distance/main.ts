// shape: a distance written with du and dv
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "max(abs(du), abs(dv))", code: `
        @grid: 1 / 100% / #0b132b;
        @content: @pattern(
          grid: 8;
          shape: max(abs(du), abs(dv));
          size: .9;
          fill: hsl(i / I, .75, .6);
        );
      ` },
    { label: "abs(du) + abs(dv)", code: `
        @grid: 1 / 100% / #0b132b;
        @content: @pattern(
          grid: 8;
          shape: abs(du) + abs(dv);
          size: .9;
          fill: hsl(i / I, .75, .6);
        );
      ` },
    { label: "min and max mixed", code: `
        @grid: 1 / 100% / #0b132b;
        @content: @pattern(
          grid: 8;
          shape: 2min(abs(du), abs(dv)) + .35 * max(abs(du), abs(dv));
          size: .9;
          fill: hsl(i / I, .75, .6);
        );
      ` },
    { label: "ngon(vec2(du, dv), 5)", code: `
        @grid: 1 / 100% / #0b132b;
        @content: @pattern(
          grid: 8;
          shape: ngon(vec2(du, dv), 5);
          size: .9;
          fill: hsl(i / I, .75, .6);
        );
      ` },
  ],
  say: "du and dv run from -0.5 to 0.5 inside each cell",
});
