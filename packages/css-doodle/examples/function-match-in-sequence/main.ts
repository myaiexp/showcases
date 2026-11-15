// @match reads n inside @m for conic stops
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "12, n % 2", code: `
      @grid: 1 / 100%;
      background: conic-gradient(
        @m12(@match(n % 2 = 0, #000, #fff) 0 @n(*30deg))
      );
    ` },
      { label: "12, n % 3", code: `
      @grid: 1 / 100%;
      background: conic-gradient(
        @m12(@match(n % 3 = 0, #e6437d, #000) 0 @n(*30deg))
      );
    ` },
      { label: "8, n < 4", code: `
      @grid: 1 / 100%;
      background: conic-gradient(
        @m8(@match(n < 4, #ebbf4d, #000) 0 @n(*45deg))
      );
    ` },
    ],
    say: "@m12(@match(n % 2 = 0, #000, #fff) 0 @n(*30deg))",
});
