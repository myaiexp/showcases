// match(t1, v1, t2, v2, …, else): a chain of values
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      grid: 32;
      v: y + 4sin(x / 4 + t);
      fill: match(v < 8, #e63946, v < 16, #fca311, v < 24, #2a9d8f, #264653);
    );
  `,
  say: "The first true test picks the color, the last value is the else",
});
