// Voronoi regions
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 60x1 / 100% / #1b1b1b;
      background: @p(
        #264653, #2a9d8f, #e9c46a, #f4a261, #e76f51
      );
      clip-path: @tile.voronoi(gap: 1);
    `,
    reroll: true,
});
