// Cube faces
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 90x1 / 100%;
      background: oklch(calc(1 - @tile.k * .22) .05 250);
      clip-path: @tile.cube();
    `,
});
