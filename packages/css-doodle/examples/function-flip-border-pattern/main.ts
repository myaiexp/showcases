// One segment mirrored four ways closes a border
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 200;
        path {
          fill: none;
          stroke: #000;
          stroke-width: 3;
          stroke-linecap: square;
          --base: h-43 v5 h-10 v-5 h-10 v16 h-32 v10 h10 v-26 h-10;
          d: M 100 5
             @p(@p(@p(--base) @flip.invert.reverse.p) @flipV.invert.p)
             @flip.p
        }
      );
    `,
    say: "M 100 5 then four stages of one base path",
});
