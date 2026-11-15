// Using an #id before it is defined
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: #000;
      clip-path: @shape(
        union {
          #tri { move: -.4 0 }
          #tri { rotate: 180; move: .4 0 }
        }
        polygon#tri { points: 0 .6, .5 -.4, -.5 -.4; scale: .8 }
      );
    `,
});
