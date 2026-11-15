// A crescent by subtraction
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: #000;
      clip-path: @shape(
        subtract {
          circle;
          circle { scale: .9; move: .45 .135 }
        }
      );
    `,
});
