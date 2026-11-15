// spiral(dx, dy): the index on a square spiral from the center
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      grid: 21;
      fill: hsl(fract(spiral(dx, dy) / 60 - .2t), .8, .55);
    );
  `,
  say: "Cell 0 is the center; the index grows along the spiral",
});
