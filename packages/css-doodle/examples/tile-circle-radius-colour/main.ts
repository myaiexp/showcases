// Circle radius with @tile.r
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 150x1 / 100%;
      background: color-mix(in oklch,
        #d00000 calc(@tile.r * 8), #ffb3c1
      );
      clip-path: @tile.circle(circle; gap: .6);
    `,
});
