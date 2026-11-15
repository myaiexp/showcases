// @flipH, @flipV and @flip around a start point
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 2 / 100% _1px;
      background: @svg(
        viewBox: -8 -6 16 16;
        --path: h 3 v 3 h 3 v -3;
        path {
          d: M 0 0 @pn(
            --path,
            @flipH(--path),
            @flipV(--path),
            @flip(--path)
          );
          fill: none;
          stroke: @pn(#e6437d, #000, #000, #000);
          stroke-width: .4;
        }
        circle { cx, cy: 0; r: .4; }
        text {
          x: 0;
          y: 8;
          text-anchor: middle;
          font-size: 1.5;
          font-family: sans-serif;
          content: @pn(Original, Horizontal, Vertical, Both);
        }
      );
    `,
    say: "M 0 0 stays; the commands after it mirror",
});
