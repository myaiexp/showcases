// draw works on circle, rect, polygon and line
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 20 20;
        fill: none;
        stroke: #000;
        stroke-width: .4;
        stroke-linecap: round;
        circle { cx: 5; cy: 5; r: 3.5; draw: 2s infinite }
        rect { x: 12; y: 1.5; width: 7; height: 7; rx: 1; draw: 2s infinite }
        polygon { points: 5 12 8.5 18.5 1.5 18.5; draw: 2s infinite }
        line { x1: 12; y1: 12; x2: 19; y2: 19; draw: 2s infinite }
      );
    `,
    say: "draw: 2s infinite on four kinds of shape",
});
