// A body of result declarations works like @function
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "double", code: `
      @grid: 4 / 100% _1px;
      --double(x): { result: $(x * 2); }
      background: #000;
      color: #fff;
      @content: $double(@i);
    ` },
      { label: "two results", code: `
      @grid: 4 / 100% _1px;
      --twice(x): { result: $(x * 2); }
      --shift(x): { result: $(twice(x) + 1); }
      background: #000;
      color: #fff;
      @content: $shift(@i);
    ` },
    ],
    say: "--double(x): { result: $(x * 2); }",
});
