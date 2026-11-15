// @reverse turns path commands around
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 4 / 100% _2px;
      background: @svg(
        viewBox: -2 -2 34 34;
        --path: M 0 0 h 10 v 10 h 5 v 5 h 10 v 10;
        path {
          d: @p($path, @reverse.$path);
          fill: none;
          stroke: #000;
          stroke-width: 3;
        }
      );
    `,
    reroll: true,
    say: "d: @p($path, @reverse.$path)",
});
