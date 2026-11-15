// Circles at @Plot points in @svg
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100% / #f4f1ea;
      background: @svg(
        viewBox: -1 -1 2 2;
        circle*60 {
          cx, cy: @Plot(r: .7 + .2cos(5t));
          r: .04;
        }
      );
    `,
});
