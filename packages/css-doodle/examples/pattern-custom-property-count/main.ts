// $name as a repeat count
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 2 / 100% / #14213d _4px;
    --n: @pn(12, 24, 36, 72);
    @content: @pattern(
      repeat($n as k) {
        a: 2π * k / $n;
        fill: #fca311, shape(length(pos - .36vec2(cos(a), sin(a))) - .02);
      }
    );
  `,
  say: "Each cell loops a different number of times",
});
