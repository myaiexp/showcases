// Variables and the frame outline
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 3 / 100% _2px;
      background: #000;
      clip-path: @shape(
        k: @pn(3, 4, 5, 6, 7, 8, 9, 10, 12);
        points: 300;
        r: cos(k * t)^2 + .5;
        frame: .05;
        scale: .6;
      );
    `,
    say: "k is a variable, @pn walks its list",
});
