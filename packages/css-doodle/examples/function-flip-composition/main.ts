// @flip.invert.reverse.p is flip(invert(reverse(p)))
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "@p", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -8 -8 16 16;
        --base: M 0 0 h 4 v 2 h -2 v 3;
        fill: none;
        stroke: #000;
        stroke-width: .3;
        stroke-linecap: round;
        circle { r: .35; fill: #e6437d }
        path { d: @p(--base) }
      );
    ` },
      { label: "@reverse.p", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -8 -8 16 16;
        --base: M 0 0 h 4 v 2 h -2 v 3;
        fill: none;
        stroke: #000;
        stroke-width: .3;
        stroke-linecap: round;
        circle { r: .35; fill: #e6437d }
        path { d: @p(--base); stroke: #e6437d }
        path { d: @reverse.p }
      );
    ` },
      { label: "@invert.reverse.p", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -8 -8 16 16;
        --base: M 0 0 h 4 v 2 h -2 v 3;
        fill: none;
        stroke: #000;
        stroke-width: .3;
        stroke-linecap: round;
        circle { r: .35; fill: #e6437d }
        path { d: @p(--base); stroke: #e6437d }
        path { d: @invert.reverse.p }
      );
    ` },
      { label: "@flip.invert.reverse.p", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -8 -8 16 16;
        --base: M 0 0 h 4 v 2 h -2 v 3;
        fill: none;
        stroke: #000;
        stroke-width: .3;
        stroke-linecap: round;
        circle { r: .35; fill: #e6437d }
        path { d: @p(--base); stroke: #e6437d }
        path { d: @flip.invert.reverse.p }
      );
    ` },
    ],
    say: "Each variant adds one function on the left",
});
