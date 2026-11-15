// @once(@p(...)) picks a single @shape
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 4 / 100% _2px;
      background: #000;
      @shape: @once(@p(star, heart, hexagon, drop));
      rotate: @r(360deg);
    `,
    reroll: true,
    say: "@shape: @once(@p(star, heart, hexagon, drop))",
});
