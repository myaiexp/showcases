// @code(@ri(9632, 9687)) prints geometric shapes
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 5 / 100% _1px;
      background: #000;
      color: #fff;
      @content: @code(@ri(9632, 9687));
    `,
    reroll: true,
    say: "@code(@ri(9632, 9687))",
});
