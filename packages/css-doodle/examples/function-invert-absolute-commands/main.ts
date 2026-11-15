// Absolute coordinates swap their offset from the start
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        --path: M 2 2 L 8 3 L 9 8;
        fill: none;
        stroke-width: .2;
        path { d: @p(--path); stroke: #e6437d }
        path { d: @invert.p; stroke: #000 }
        circle { cx, cy: 2; r: .3; fill: #ebbf4d }
      );
    `,
    say: "M stays, the L offsets swap",
});
