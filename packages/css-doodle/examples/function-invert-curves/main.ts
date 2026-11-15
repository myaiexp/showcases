// @invert on a path with c and a commands
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -24 -24 48 48;
        --leaf: M 0 0 c 0 -14 18 -16 16 -4 a 10 6 0 0 1 -16 4;
        fill: none;
        stroke: #000;
        stroke-width: .8;
        path { d: @p(--leaf); stroke: #e6437d }
        path { d: @invert.p }
      );
    `,
    say: "c and a commands swap their numbers",
});
