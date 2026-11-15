// Copies: twelve gear teeth
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: #000;
      clip-path: @shape(
        subtract {
          union {
            circle { r: .72 }
            polygon*12 {
              points: -.11 0, .11 0, .07 .22, -.07 .22;
              move: 0 .66;
              rotate: n * 30;
            }
          }
          circle { r: .26 }
        }
        round: .03;
      );
    `,
});
