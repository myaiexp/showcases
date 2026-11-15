// Comments inside @shape
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: #000;
      clip-path: @shape(
        heart;
        // scale: .5 1;   <- try removing the slashes
        rotate: 20;   // lean a little
        scale: .85;
      );
    `,
});
