// size and t: cells that breathe, and an image size with @pattern800
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100% / #fff;
    @content: @pattern800(
      grid: 32;
      size: sin(4*log(dr) - 2t - da);
      fill: #000;
    );
  `,
  say: "size alone masks each cell with a square",
});
