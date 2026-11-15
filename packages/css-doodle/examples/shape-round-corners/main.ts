// Round corners
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 3 / 100% _2px;
      background: #000;
      clip-path: @shape(
        triangle;
        round: @pn(0, .05, .1, .15, .2, .3, .4, .5, .6);
      );
    `,
});
