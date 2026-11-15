// Distance variables: dx, dy, dr, dc, dm, da, db
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: ".5 + dx / X", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 17;
          fill: .5 + dx / X;
        );
      ` },
    { label: ".5 + dy / Y", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 17;
          fill: .5 + dy / Y;
        );
      ` },
    { label: "dr / 12", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 17;
          fill: dr / 12;
        );
      ` },
    { label: "dc / 9", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 17;
          fill: dc / 9;
        );
      ` },
    { label: "dm / 16", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 17;
          fill: dm / 16;
        );
      ` },
    { label: ".5 + da / 2π", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 17;
          fill: .5 + da / (2π);
        );
      ` },
    { label: "db / 8", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          grid: 17;
          fill: db / 8;
        );
      ` },
  ],
  say: "The same names the @dx family gives to cells",
});
