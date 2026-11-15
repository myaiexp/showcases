// Edges that depend on x and y
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 80x1 / 100%;
      background: #000;
      clip-path: @tile.triangle(
        edge: .12 * x * sin(2t);
        gap: .5
      );
    `,
});
