// @match with several condition and value pairs
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "rings 3 5 7", code: `
      @grid: 15 / 100% _1px;
      background: @match(
        dr < 3, #000,
        dr < 5, #e6437d,
        dr < 7, #ebbf4d,
        #eee
      );
    ` },
      { label: "rings 2 4 6", code: `
      @grid: 15 / 100% _1px;
      background: @match(
        dr < 2, #000,
        dr < 4, #e6437d,
        dr < 6, #ebbf4d,
        #eee
      );
    ` },
      { label: "rings 5 7 8", code: `
      @grid: 15 / 100% _1px;
      background: @match(
        dr < 5, #000,
        dr < 7, #e6437d,
        dr < 8, #ebbf4d,
        #eee
      );
    ` },
    ],
    say: "dr < 3, dr < 5, dr < 7, else",
});
