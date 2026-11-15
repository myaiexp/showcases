// Packed circles
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 160x1 / 100%;
      background: red;
      clip-path: @tile.circle(r: cos(2t); gap: .4);
    `,
    reroll: true,
});
