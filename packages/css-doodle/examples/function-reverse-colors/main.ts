// @pn.reverse hands out a list in reverse
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "@pn.reverse", code: `
      @grid: 5x1 / 100% _1px;
      background: @pn.reverse(#000, #333, #666, #999, #ccc);
    ` },
      { label: "@pn", code: `
      @grid: 5x1 / 100% _1px;
      background: @pn(#000, #333, #666, #999, #ccc);
    ` },
    ],
    say: "Written #000 … #ccc, drawn #ccc … #000",
});
