// size on its own masks with a square
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100% / #14213d;
    @content: @pattern(
      grid: 12;
      size: .5 + .5sin(dr - 2t);
      fill: #f06;
    );
  `,
  say: "No shape is named, so the square mask is used",
});
