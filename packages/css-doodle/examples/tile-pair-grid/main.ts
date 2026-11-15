// Pair turn on a square grid
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 40x1 / 100% / #222;
      background: oklch(.78 .11 calc(@tile.k * 90));
      clip-path: @tile.grid(
        pair: turn;
        edge: .3 * sin(t / 2)^2 * (e - 1.5) + .1 * sin(t);
        gap: .5
      );
    `,
});
