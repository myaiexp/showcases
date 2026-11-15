// Lizards: pair: turn
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 48x1 / 100% / #222;
      background: oklch(.78 .11 calc(@tile.k * 120));
      clip-path: @tile.hex(
        pair: turn;
        edge: .3 * sin(t / 2)^2 * (e - 2) + .1 * sin(t);
        gap: .5
      );
    `,
});
