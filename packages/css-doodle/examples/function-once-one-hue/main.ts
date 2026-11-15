// @once draws a random value one time
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 6 / 100% _1px;
      background: hsl(@once(@r(360)), 70%, @r(30%, 80%));
    `,
    reroll: true,
    say: "The hue is drawn once, the lightness in every cell",
});
