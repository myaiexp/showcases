// @match(@i = 1, @r(10), 0) draws one random number
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 5 / 100% _1px;
      background: #000;
      color: #fff;
      font-size: 1.4em;
      @content: @match(@i = 1, @r(10), 0);
    `,
    reroll: true,
    say: "@match(@i = 1, @r(10), 0)",
});
