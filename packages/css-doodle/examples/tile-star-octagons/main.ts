// Eight-pointed stars with op and star
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 150x1 / 100% / #000;
      background: @match(@tile.k == 3, #fff, #e6437d);
      clip-path: @tile.grid(op: t; star: 67.5; gap: .5);
    `,
});
