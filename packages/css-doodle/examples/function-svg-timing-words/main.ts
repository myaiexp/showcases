// Duration, delay, repeat, easing, discrete, forwards
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "2s ease infinite", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        line { x1: 1; y1: 5; x2: 9; y2: 5; stroke: #999; stroke-width: .1 }
        circle {
          cy: 5;
          r: .6;
          fill: #e6437d;
          animate cx: 1; 3; 9 / 2s ease infinite;
        }
      );
    ` },
      { label: "2s 1s 3 (delay, count)", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        line { x1: 1; y1: 5; x2: 9; y2: 5; stroke: #999; stroke-width: .1 }
        circle {
          cy: 5;
          r: .6;
          fill: #e6437d;
          animate cx: 1; 3; 9 / 2s 1s 3;
        }
      );
    ` },
      { label: "discrete", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        line { x1: 1; y1: 5; x2: 9; y2: 5; stroke: #999; stroke-width: .1 }
        circle {
          cy: 5;
          r: .6;
          fill: #e6437d;
          animate cx: 1; 3; 9 / 3s discrete infinite;
        }
      );
    ` },
      { label: "paced", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        line { x1: 1; y1: 5; x2: 9; y2: 5; stroke: #999; stroke-width: .1 }
        circle {
          cy: 5;
          r: .6;
          fill: #e6437d;
          animate cx: 1; 3; 9 / 4s paced infinite;
        }
      );
    ` },
      { label: "forwards", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        line { x1: 1; y1: 5; x2: 9; y2: 5; stroke: #999; stroke-width: .1 }
        circle {
          cy: 5;
          r: .6;
          fill: #e6437d;
          animate cx: 1; 3; 9 / 2s forwards;
        }
      );
    ` },
    ],
    say: "The timing after / decides how it moves",
});
