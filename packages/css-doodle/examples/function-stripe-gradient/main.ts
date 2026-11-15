// @stripe turns colors into stripes of equal width
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 5 / 100% _1px;
      background: linear-gradient(
        @r(360deg),
        @stripe(#000, #e6437d, #ebbf4d)
      );
    `,
    reroll: true,
    say: "linear-gradient(@r(360deg), @stripe(…))",
});
