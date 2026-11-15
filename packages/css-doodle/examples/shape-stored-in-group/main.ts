// Stored bodies inside a group
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      :doodle {
        --petal: (points: 240; r: cos(k * t)^2 + .25; scale: .75);
      }
      @grid: 1 / 100%;
      background: #000;
      clip-path: @shape(union { $petal { k: 2 } $petal { k: 3 } });
    `,
});
