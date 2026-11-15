// When to is less than from the arc runs backwards
import { show } from '../../shared/c-kit.ts';

export default show({
    doodles: [
      { label: "clockwise", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(r: 36; from: 30; to: 150; at: 50 50);
          fill: none;
          stroke: #000;
          stroke-width: 6;
          stroke-linecap: round;
          stroke: #e6437d;
        }
      );
    ` },
      { label: "counter-clockwise", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(r: 36; from: 150; to: 30; at: 50 50);
          fill: none;
          stroke: #000;
          stroke-width: 6;
          stroke-linecap: round;
        }
      );
    ` },
    ],
    say: "from 30 to 150, and from 150 down to 30",
});
