// @match(condition, value, fallback) by cell index
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "i > 12", code: `
      @grid: 5 / 100% _1px;
      background: @match(i > 12, #e6437d, #000);
    ` },
      { label: "i % 2 = 0", code: `
      @grid: 5 / 100% _1px;
      background: @match(i % 2 = 0, #e6437d, #000);
    ` },
      { label: "x > y", code: `
      @grid: 5 / 100% _1px;
      background: @match(x > y, #e6437d, #000);
    ` },
      { label: "i > 5 && i < 15", code: `
      @grid: 5 / 100% _1px;
      background: @match(i > 5 && i < 15, #e6437d, #000);
    ` },
    ],
    say: "A condition over cell variables, a value, a fallback",
});
