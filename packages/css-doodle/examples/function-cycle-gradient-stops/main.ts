// @p.cycle rotates the colors of a gradient
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 4 / 100% _2px;
      background: linear-gradient(90deg, @p.cycle(#000, #e6437d, #ebbf4d));
    `,
    reroll: true,
    say: "The same three colors, in a random rotation per cell",
});
