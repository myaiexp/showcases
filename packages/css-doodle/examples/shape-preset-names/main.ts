// Preset names inside @shape
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 4 / 100% _2px;
      background: #000;
      clip-path: @shape(@p(star, heart, drop, clover 4));
      rotate: @r(360deg);
      transition: .6s;
    `,
    reroll: true,
});
