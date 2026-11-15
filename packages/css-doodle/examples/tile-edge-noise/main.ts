// Edges with @R.t noise
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 40x1 / 100% / #222;
      background: hsl(@r(360) 60% 70%);
      clip-path: @tile.grid(edge: @R.t(-.2, .2); gap: .6);
    `,
    reroll: true,
});
