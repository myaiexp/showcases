// Reversed relative commands keep the start and end
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -2 -2 20 20;
        --path: M 0 0 h 10 v 5 h 5 v 10;
        fill: none;
        stroke-width: 1;
        path { d: $path; stroke: #e6437d }
        path { d: @reverse.$path; stroke: #000 }
        circle { r: 1; cx, cy: 0; fill: #ebbf4d }
        circle { r: 1; cx: 15; cy: 15; fill: #ebbf4d }
      );
    `,
    say: "The values are kept; only the order of the commands changes",
});
