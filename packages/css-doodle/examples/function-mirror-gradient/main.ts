// @mirror inside linear-gradient makes it symmetric
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "3 colors", code: `
      @grid: 1 / 100%;
      background: linear-gradient(
        90deg,
        @mirror(#000, #e6437d, #ebbf4d)
      );
    ` },
      { label: "4 colors", code: `
      @grid: 1 / 100%;
      background: linear-gradient(
        90deg,
        @mirror(#000, #e6437d, #ebbf4d, #fff)
      );
    ` },
      { label: "2 colors", code: `
      @grid: 1 / 100%;
      background: linear-gradient(
        90deg,
        @mirror(#000, #ebbf4d)
      );
    ` },
    ],
    say: "linear-gradient(90deg, @mirror(…))",
});
