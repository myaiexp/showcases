// SVG path data as the outline
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: #000;
      clip-path: @shape(
        path: M4 4 H20 A2 2 0 0 1 22 6 V16 A2 2 0 0 1 20 18
              H9 L4 22 V18 A2 2 0 0 1 2 16 V6 A2 2 0 0 1 4 4 Z;
        scale: .9;
      );
    `,
});
