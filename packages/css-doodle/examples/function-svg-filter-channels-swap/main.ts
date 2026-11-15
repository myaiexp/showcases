// channels { r: b; b: r; } is a color matrix
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 6 / 100%;
      background: @p(#e6437d, #ebbf4d, #000);
      filter: @svg-filter(
        channels { r: b; b: r; }
      );
    `,
    reroll: true,
    say: "channels { r: b; b: r; }",
});
