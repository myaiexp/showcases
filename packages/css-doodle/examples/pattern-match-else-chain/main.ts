// match { … }: an else chain, the first test that holds wins
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      grid: 32;
      match {
        x = y or x + y = 33 { fill: #fff }
        mod(dc - 2t, 3) < 1 { fill: #000 }
        else { fill: #e63946 }
      }
    );
  `,
  say: "x = y or x + y = 33 wins first, then the moving rings, then else",
});
