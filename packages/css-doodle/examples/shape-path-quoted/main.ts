// Path data with commas
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: #000;
      clip-path: @shape(
        path: 'M13,2 L4,14 H11 L10,22 L20,9 H13 Z';
        scale: .9;
      );
    `,
});
