// Pieces on the left half
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 60x1 / 100% / #111;
      background: @match(@tile.x < 50, #e76f51, #2a9d8f);
      clip-path: @tile.voronoi(gap: .8);
    `,
    reroll: true,
});
