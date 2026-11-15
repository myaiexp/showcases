// @svg-polygon(star; scale: .9; …) adds to a preset
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 3 / 100% _2px;
      background: @svg-polygon(
        @p(star, heart, hexagon);
        scale: .9;
        stroke-width: .05;
        fill: @p(#e6437d, #ebbf4d);
      );
    `,
    reroll: true,
    say: "@svg-polygon(@p(star, heart, hexagon); scale: .9; …)",
});
