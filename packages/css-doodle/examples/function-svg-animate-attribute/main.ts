// animate r: .2; .8; .2 / 2s ease infinite
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -5 -5 10 10;
        circle*8 {
          cx, cy: @Plot(r: 3);
          r: .6;
          fill: #000;
          animate r: .2; .8; .2 / 2s ease infinite;
        }
      );
    `,
    say: "animate r: .2; .8; .2 / 2s ease infinite",
});
