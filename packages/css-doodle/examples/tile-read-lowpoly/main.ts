// Low-poly shading
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 100x1 / 100%;
      background: color-mix(in oklch,
        #0b2545 calc(@tile.y + @r(-12, 12)%), #b9d6f2
      );
      clip-path: @tile.delaunay(circle);
    `,
    reroll: true,
});
