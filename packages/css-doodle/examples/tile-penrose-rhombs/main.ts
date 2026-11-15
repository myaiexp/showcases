// Penrose rhombs
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 150x1 / 100%;
      background: color-mix(in oklch,
        #00539c calc((@tile.k - 1) * 100%), #ffd662
      );
      clip-path: @tile.penrose(gap: .4);
    `,
});
