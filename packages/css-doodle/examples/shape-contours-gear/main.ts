// Contours with their own point counts
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: #000;
      clip-path: @shape(
        points: 240, 200, 200, 36;
        r: .92 + .08 * max(-1, min(1, 2.5cos(24t))),
           .34 + .36 * max(0, min(1, 4 * (.15 - cos(5t)))),
           .34, .09;
        fill-rule: evenodd;
        scale: .9;
      );
    `,
});
