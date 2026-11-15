// Comments in a tile body
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 60x1 / 100% / #1b1b1b;
      background: hsl(@r(34, 44) 92% @r(52, 64)%);
      clip-path: @tile.hex(
        circle;    // the shape being cut
        // jitter: .2;
        gap: .8
      );
    `,
});
