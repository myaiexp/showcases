// Copies in a grid: nx and ny
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: #000;
      clip-path: @shape(
        circle*3x3 {
          scale: .24;
          move: nx * .6 - 1.2, ny * .6 - 1.2;
        }
      );
    `,
});
