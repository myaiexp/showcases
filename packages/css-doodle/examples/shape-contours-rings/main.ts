// Contours: nested rings
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: #000;
      clip-path: @shape(
        points: 120;
        r: 1, .75, .5, .25;
        fill-rule: evenodd;
        scale: .9;
      );
    `,
});
