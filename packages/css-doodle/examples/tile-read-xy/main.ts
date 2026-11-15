// A radial light per region
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 60x1 / 100% / #000;
      background: radial-gradient(8% 8% at @tile.xy,
        #fff 15%, #48cae4 30%, #023e8a
      );
      clip-path: @tile.voronoi(gap: .6);
    `,
    reroll: true,
});
