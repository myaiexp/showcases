// Contours placed with x and y lists
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: #000;
      clip-path: @shape(
        points: 90;
        x: cos(t), .14cos(t) + .3, .14cos(t) - .3,
           .14cos(t) - .3, .14cos(t) + .3;
        y: sin(t), .14sin(t) + .3, .14sin(t) + .3,
           .14sin(t) - .3, .14sin(t) - .3;
        fill-rule: evenodd;
        scale: .9;
      );
    `,
});
