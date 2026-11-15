// A rotate list: two triangles
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: #000;
      clip-path: @shape(
        points: 3;
        rotate: 0, 60;
        scale: .9;
      );
    `,
});
