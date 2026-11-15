// The initial M outside the function continues the path
import { show } from '../../shared/c-kit.ts';

export default show({
    doodles: [
      { label: "M outside", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 12 12;
        fill: none;
        stroke: #000;
        stroke-width: .3;
        path { d: M 1 4 h 3 v 3 h 2 @flipH(h 3 v 3 h 2) }
      );
    ` },
      { label: "M inside", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 12 12;
        fill: none;
        stroke: #000;
        stroke-width: .3;
        path { d: M 1 4 h 3 v 3 h 2 @flipH(M 6 4 h 3 v 3 h 2) }
      );
    ` },
    ],
    say: "M outside: one line. M inside: a new subpath",
});
