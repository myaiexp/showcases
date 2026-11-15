// Mirror two lobes into a butterfly
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 3 / 100% _2px;
      background: #000;
      clip-path: @shape(
        points: 240;
        r: .2 + .8exp(3 * (cos(t - @r(.2, 1)) - 1))
           + .4exp(6 * (cos(t + @r(.3, 1)) - 1));
        scale: .8;
        mirror: x;
      );
    `,
    reroll: true,
});
