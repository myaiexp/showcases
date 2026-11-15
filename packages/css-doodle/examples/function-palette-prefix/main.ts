// @palette(3) is the first three of @palette(5)
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "@palette(2)", code: `
      @grid: 2x1 / 100%;
      background: @pn(@palette(2));
    ` },
      { label: "@palette(3)", code: `
      @grid: 3x1 / 100%;
      background: @pn(@palette(3));
    ` },
      { label: "@palette(5)", code: `
      @grid: 5x1 / 100%;
      background: @pn(@palette(5));
    ` },
      { label: "@palette(9)", code: `
      @grid: 9x1 / 100%;
      background: @pn(@palette(9));
    ` },
    ],
    attrs: {"seed":"palette-demo"},
    say: "Same seed: the short list is the start of the long one",
});
