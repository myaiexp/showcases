// Voronoi kinds never repeat next to each other
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 100x1 / 100%;
      background: oklch(.75 .12 calc(@tile.k * 72));
      clip-path: @tile.voronoi(gap: .5);
    `,
    reroll: true,
});
