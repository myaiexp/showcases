// Reusing a stored body with $name
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      :doodle {
        --petal: (points: 240; r: cos(k * t)^2 + .25; scale: .75);
      }
      @grid: 3 / 100% _2px;
      background: #000;
      clip-path: @shape($petal; k: @i + 1);
    `,
});
