// Point counts per outline
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: #000;
      clip-path: @shape(
        points: 180, 20;
        subtract {
          circle { scale: .9 }
          circle { scale: .3 }
        }
      );
      animation: ring 2.5s ease-in-out infinite alternate;
      @keyframes ring {
        to {
          clip-path: @shape(
            points: 180, 20;
            subtract {
              circle { scale: .6 }
              circle { scale: .5 }
            }
          );
        }
      }
    `,
});
