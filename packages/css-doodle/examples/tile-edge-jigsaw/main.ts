// Random edges like a jigsaw
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 60x1 / 100% / #1b1b1b;
      background: hsl(@r(190, 230) 55% @r(45, 70)%);
      clip-path: @tile.hex(
        edge: .25 * sin(t) * (random() - .5);
        gap: .5
      );
    `,
    reroll: true,
});
