// @palette(5, #e6437d) keeps your color second
import { show } from '../../shared/c-kit.ts';

export default show({
    doodles: [
      { label: "(5, #e6437d)", code: `
      @grid: 5x1 / 100%;
      background: @pn(@palette(5, #e6437d));
    ` },
      { label: "(#e6437d, 5)", code: `
      @grid: 5x1 / 100%;
      background: @pn(@palette(#e6437d, 5));
    ` },
    ],
    reroll: true,
    say: "The pink stays second; the rest changes with the seed",
});
