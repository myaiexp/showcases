// Grow with noise
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 3 / 100% _2px;
      background: #000;
      clip-path: @shape(
        circle;
        scale: .7;
        grow: @R.t(-.1, .1);
        points: 200;
      );
    `,
    reroll: true,
});
