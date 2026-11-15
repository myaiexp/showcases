// @code(@ri(9812, 9823)) picks a chess piece
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 5 / 100% _1px;
      background: #000;
      color: #fff;
      font-size: 1.5em;
      @content: @code(@ri(9812, 9823));
    `,
    reroll: true,
    say: "@code(@ri(9812, 9823))",
});
