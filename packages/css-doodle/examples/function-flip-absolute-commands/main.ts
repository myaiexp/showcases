// Offsets from the start point mirror
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "@flipH.p", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        --path: M 5 5 L 9 5 L 9 9 L 7 9;
        fill: none;
        stroke-width: .25;
        path { d: @p(--path); stroke: #e6437d }
        path { d: @flipH.p; stroke: #000 }
      );
    ` },
      { label: "@flipV.p", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        --path: M 5 5 L 9 5 L 9 9 L 7 9;
        fill: none;
        stroke-width: .25;
        path { d: @p(--path); stroke: #e6437d }
        path { d: @flipV.p; stroke: #000 }
      );
    ` },
      { label: "@flip.p", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        --path: M 5 5 L 9 5 L 9 9 L 7 9;
        fill: none;
        stroke-width: .25;
        path { d: @p(--path); stroke: #e6437d }
        path { d: @flip.p; stroke: #000 }
      );
    ` },
    ],
    say: "M stays, every other point reflects through it",
});
