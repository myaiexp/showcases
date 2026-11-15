// Four ways to join two overlapping circles
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "union", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -5 -5 10 10;
        union {
          fill: #e6437d;
          stroke: #000;
          stroke-width: .15;
          circle { cx: -1.5; r: 3 }
          circle { cx: 1.5; r: 3 }
        }
      );
    ` },
      { label: "subtract", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -5 -5 10 10;
        subtract {
          fill: #e6437d;
          stroke: #000;
          stroke-width: .15;
          circle { cx: -1.5; r: 3 }
          circle { cx: 1.5; r: 3 }
        }
      );
    ` },
      { label: "intersect", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -5 -5 10 10;
        intersect {
          fill: #e6437d;
          stroke: #000;
          stroke-width: .15;
          circle { cx: -1.5; r: 3 }
          circle { cx: 1.5; r: 3 }
        }
      );
    ` },
      { label: "exclude", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -5 -5 10 10;
        exclude {
          fill: #e6437d;
          stroke: #000;
          stroke-width: .15;
          circle { cx: -1.5; r: 3 }
          circle { cx: 1.5; r: 3 }
        }
      );
    ` },
    ],
    say: "One path comes out of each block",
});
