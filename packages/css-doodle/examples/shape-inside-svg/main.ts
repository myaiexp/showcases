// The same body inside @svg
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100% / #f4f1ea;
      background: @svg(
        viewBox: -1 -1 2 2;
        path {
          d: @shape(heart; scale: .9);
          fill: #e6437d;
          stroke: #000;
          stroke-width: .03;
        }
      );
    `,
});
