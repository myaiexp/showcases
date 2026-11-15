// Naming a shape with #id
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: #000;
      clip-path: @shape(
        circle#hole { scale: .2 }
        subtract {
          circle;
          #hole { move: .5 0 }
        }
      );
    `,
});
