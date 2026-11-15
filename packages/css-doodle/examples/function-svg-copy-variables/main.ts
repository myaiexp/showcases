// --i: @n; r: $(i * 2) inside a repeat
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -7 -7 14 14;
        circle*3 {
          --i: @n;
          --c, fill: @p(#e6437d, #ebbf4d, #000);
          r: $(i * 2);
          fill: none;
          stroke: $c;
          stroke-width: 1;
        }
      );
    `,
    reroll: true,
    say: "--c, fill: @p(…) then stroke: $c",
});
