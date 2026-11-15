// match(test, a, b): picking a value inside an expression
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      grid: 32;
      fill: match(y > 16 + 6sin(x / 3 + t), #000, #fff);
    );
  `,
  say: "match(test, a, b) in a fill: the color is chosen per cell",
});
