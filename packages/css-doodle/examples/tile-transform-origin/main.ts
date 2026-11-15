// Pieces that pulse in place
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 40x1 / 100%;
      background: #e6437d;
      clip-path: @tile.hex(circle);
      animation: pulse 2s infinite alternate;
      animation-delay: @r(-2s);
      @keyframes pulse {
        to { scale: .3 }
      };
    `,
});
