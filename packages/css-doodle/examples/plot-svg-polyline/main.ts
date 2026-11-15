// A polyline from @Plot points
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100% / #f4f1ea;
      background: @svg(
        viewBox: -1 -1 2 2;
        polyline {
          points: @Plot(points: 360; r: t / 20; turn: 3);
          fill: none;
          stroke: #000;
          stroke-width: .02;
        }
      );
    `,
});
