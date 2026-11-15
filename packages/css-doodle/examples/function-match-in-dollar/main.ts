// $(match(...)) with a fallback of 0
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "x = 1, 5, 7", code: `
      @grid: 4 / 100% _1px;
      background: #000;
      color: #fff;
      @content: $(match(x = 1, 5, 7));
    ` },
      { label: "no fallback", code: `
      @grid: 4 / 100% _1px;
      background: #000;
      color: #fff;
      @content: $(match(x = 1, 5));
    ` },
      { label: "two arms", code: `
      @grid: 4 / 100% _1px;
      background: #000;
      color: #fff;
      @content: $(match(x = y, 1, x > y, 2, 3));
    ` },
    ],
    say: "match() reads cell variables like x and y",
});
