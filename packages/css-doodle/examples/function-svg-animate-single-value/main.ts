// A single animate value is the target; no name is draw
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "animate to a value", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        circle { cx, cy: 5; r: 1; fill: #e6437d; animate r: 4 / 2s infinite }
      );
    ` },
      { label: "no attribute name", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        circle {
          cx, cy: 5; r: 3.5;
          fill: none; stroke: #000; stroke-width: .3;
          animate: 3s infinite;
        }
      );
    ` },
    ],
    say: "animate r: 4 / 2s forwards   ·   animate: 3s infinite",
});
