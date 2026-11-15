// @palette counts take arithmetic, decimals are cut
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "2 * 3", code: `
      @grid: 6x1 / 100%;
      background: @pn(@palette(2 * 3));
    ` },
      { label: "4.9", code: `
      @grid: 6x1 / 100%;
      background: @pn(@palette(4.9));
    ` },
      { label: "1", code: `
      @grid: 6x1 / 100%;
      background: @pn(@palette(1));
    ` },
    ],
    attrs: {"seed":"count"},
    say: "Counts run from 1 to 256; the default is 5",
});
