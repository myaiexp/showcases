// A base segment and three transformed copies
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 9 9;
        --base: h1 v-1 h-1 v-2 h1 v1 h1 v-1 h1 v2 h-1 v1 h2;
        path {
          d: M 1 8
            @p(--base)
            @flip.invert.p v1
            @reverse.invert.flipH.p
            @reverse.flipH.p;
          fill: none;
          stroke: #000;
          stroke-width: .15;
          stroke-linecap: square;
        }
      );
    `,
    say: "Composition reads right to left",
});
