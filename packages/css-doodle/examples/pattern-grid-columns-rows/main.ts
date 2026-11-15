// grid: n x m, columns by rows
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      grid: 32 x 18;
      fill: hsl(x / X + .08 * y / Y, .7, .25 + .35 * y / Y);
    );
  `,
  frame: "wide",
  say: "grid: 32 x 18 gives 32 columns and 18 rows",
});
