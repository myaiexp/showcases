// Colour from the piece's centre
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 60x1 / 100%;
      background: color-mix(in oklch, #264653 @tile.y, #e9c46a);
      clip-path: @tile.voronoi(gap: 1);
    `,
    reroll: true,
});
