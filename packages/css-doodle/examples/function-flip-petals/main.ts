// Control points flip with the rest of the path
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -20 -20 40 40;
        --petal: M 0 0 c 0 -12 18 -18 18 -6 q 0 6 -18 6;
        fill: none;
        stroke: #000;
        stroke-width: .6;
        path { d: @p(--petal); stroke: #e6437d }
        path { d: @flipH.p @flipV.p @flip.p }
      );
    `,
    say: "d: @flipH.p @flipV.p @flip.p",
});
