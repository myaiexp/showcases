// @invert reflects path data along the diagonal
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "h 3 v 3 h 3 v -3", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        --path: M 2 2 h 3 v 3 h 3 v -3;
        fill: none;
        stroke-width: .2;
        path { d: @p(--path); stroke: #e6437d }
        path { d: @invert.p; stroke: #000 }
      );
    ` },
      { label: "stairs", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        --path: M 1 1 h 2 v 2 h 2 v 2 h 2 v 2;
        fill: none;
        stroke-width: .2;
        path { d: @p(--path); stroke: #e6437d }
        path { d: @invert.p; stroke: #000 }
      );
    ` },
      { label: "zigzag", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        --path: M 1 8 h 2 v -3 h 2 v 4 h 2 v -5;
        fill: none;
        stroke-width: .2;
        path { d: @p(--path); stroke: #e6437d }
        path { d: @invert.p; stroke: #000 }
      );
    ` },
    ],
    say: "A reflection through the start point",
});
