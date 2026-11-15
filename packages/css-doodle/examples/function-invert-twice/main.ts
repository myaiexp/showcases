// @invert.invert.p is the original
import { show } from '../../shared/c-kit.ts';

export default show({
    doodles: [
      { label: "path", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        --path: M 2 2 h 3 v 3 h 3 v -3;
        fill: none;
        stroke: #000;
        stroke-width: .3;
        path { d: @p(--path) }
      );
    ` },
      { label: "@invert.invert.p", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        --path: M 2 2 h 3 v 3 h 3 v -3;
        fill: none;
        stroke: #000;
        stroke-width: .3;
        path { d: @p(--path); stroke: #e6437d; stroke-width: 1 }
        path { d: @invert.invert.p }
      );
    ` },
    ],
    say: "invert(invert(path)) is the path",
});
