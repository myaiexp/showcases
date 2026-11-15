// Triangles in a circle
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 100x1 / 100% / #111;
      background: @match(@tile.k == 1, #e63946, #457b9d);
      clip-path: @tile.triangle(circle; gap: .6);
    `,
});
