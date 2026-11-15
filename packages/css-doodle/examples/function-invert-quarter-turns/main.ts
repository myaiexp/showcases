// @invert with @flipH or @flipV makes a quarter turn
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "original", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -6 -6 12 12;
        --path: M 0 0 h 4 v 2 h -1 v 3;
        fill: none;
        stroke: #000;
        stroke-width: .3;
        stroke-linecap: round;
        circle { r: .35; fill: #e6437d }
        path { d: @p(--path) }
      );
    ` },
      { label: "@flipH.invert", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -6 -6 12 12;
        --path: M 0 0 h 4 v 2 h -1 v 3;
        fill: none;
        stroke: #000;
        stroke-width: .3;
        stroke-linecap: round;
        circle { r: .35; fill: #e6437d }
        path { d: @p(--path); stroke: #e6437d }
        path { d: @flipH.invert.p }
      );
    ` },
      { label: "@flipV.invert", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -6 -6 12 12;
        --path: M 0 0 h 4 v 2 h -1 v 3;
        fill: none;
        stroke: #000;
        stroke-width: .3;
        stroke-linecap: round;
        circle { r: .35; fill: #e6437d }
        path { d: @p(--path); stroke: #e6437d }
        path { d: @flipV.invert.p }
      );
    ` },
      { label: "@flip", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -6 -6 12 12;
        --path: M 0 0 h 4 v 2 h -1 v 3;
        fill: none;
        stroke: #000;
        stroke-width: .3;
        stroke-linecap: round;
        circle { r: .35; fill: #e6437d }
        path { d: @p(--path); stroke: #e6437d }
        path { d: @flip.p }
      );
    ` },
    ],
    say: "flipH.invert and flipV.invert turn the path",
});
