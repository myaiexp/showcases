// $name: each cell's own custom property in a pattern
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "3 × 3", code: `
        @grid: 3 / 100% / #f4efe6 _2px;
        --k: @i;
        background: @pattern(
          shape: circle;
          size: $k / 9;
          fill: #000;
        );
      ` },
    { label: "4 × 4", code: `
        @grid: 4 / 100% / #f4efe6 _2px;
        --k: @i;
        background: @pattern(
          shape: circle;
          size: $k / 16;
          fill: #000;
        );
      ` },
    { label: "5 × 5", code: `
        @grid: 5 / 100% / #f4efe6 _2px;
        --k: @i;
        background: @pattern(
          shape: circle;
          size: $k / 25;
          fill: #000;
        );
      ` },
  ],
  say: "size: $k / 9 reads each cell's own --k",
});
