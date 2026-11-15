// --wave(v) drives scale and opacity from @x and @y
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 9 / 100%;
      --wave(v): $(sin(v / 1.5) / 2 + .5);
      background: #000;
      border-radius: 50%;
      scale: $wave(@x);
      opacity: $wave(@y);
    `,
    say: "scale: $wave(@x); opacity: $wave(@y)",
});
