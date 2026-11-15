// Operator t cuts the corners
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 100x1 / 100% / #222;
      background: @match(@tile.k == 1, #ebbf4d, #e6437d);
      clip-path: @tile.grid(op: t; gap: .8);
    `,
});
