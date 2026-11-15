// pick(k: a, b, …): item k from 1, wrapping around
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      grid: 12;
      fill: pick(x + y + floor(3t): #f06, #fc0, #0cf);
    );
  `,
  say: "k wraps: item 4 is item 1 again",
});
