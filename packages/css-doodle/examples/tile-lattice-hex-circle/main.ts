// Hexagons inside a circle
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 60x1 / 100% / #3b2410;
      background: hsl(@r(34, 44) 92% @r(52, 64)%);
      clip-path: @tile.hex(circle; gap: 1.2; r: .8);
    `,
    reroll: true,
});
