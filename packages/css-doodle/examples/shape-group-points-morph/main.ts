// Morphing two groups
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: #000;
      clip-path: @shape(
        points: 120;
        union {
          circle { scale: .5; move: -.3 0 }
          circle { scale: .5; move: .3 0 }
        }
      );
      animation: morph 2.5s ease-in-out infinite alternate;
      @keyframes morph {
        to {
          clip-path: @shape(
            points: 120;
            union {
              circle { scale: .5; move: -.3 .3 }
              circle { scale: .5; move: .3 -.3 }
            }
          );
        }
      }
    `,
});
