// draw: 3s infinite on a path with an @arc
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        fill: none;
        stroke: #000;
        stroke-width: 5;
        stroke-linecap: round;
        path { d: @arc(r: 38; from: -90; to: 180; at: 50 50); draw: 3s infinite }
        path { d: @arc(r: 22; from: 90; to: 360; at: 50 50); stroke: #e6437d; draw: 3s infinite }
      );
    `,
    say: "draw: 3s infinite",
});
