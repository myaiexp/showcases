// Blocks: presets, polygon and shape
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: #000;
      clip-path: @shape(
        union {
          circle { scale: .5; move: 0 .25 }
          polygon { points: -.6 -.1, .6 -.1, 0 -.9; }
          shape { points: 5; scale: .25; move: .6 .6 }
        }
      );
    `,
});
