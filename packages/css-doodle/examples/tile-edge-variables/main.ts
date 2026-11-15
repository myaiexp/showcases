// Edge reading other commands
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 40x1 / 100% / #222;
      background: hsl(@r(360) 60% 70%);
      clip-path: @tile.grid(
        a: .1 * x;
        edge: a * sin(2t);
        gap: .5
      );
    `,
    reroll: true,
});
