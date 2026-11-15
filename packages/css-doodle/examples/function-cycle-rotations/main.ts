// @p.cycle picks one rotation of a list per cell
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 5 / 100% _2px;
      background: #000;
      border-radius: @p.cycle(100% 0 0 0);
    `,
    reroll: true,
    say: "@p.cycle(100% 0 0 0): a random rotation of the list in each cell",
});
