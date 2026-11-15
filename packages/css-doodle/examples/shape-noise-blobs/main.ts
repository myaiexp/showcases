// Noise outlines with @R.t
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 3 / 100% _2px;
      background: #000;
      clip-path: @shape(
        points: 200;
        r: @R.t(.6, 1);
      );
    `,
    reroll: true,
});
