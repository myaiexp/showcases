// Plot inside @m: one cell holds the shape
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100% / #f4f1ea;
      background: @m50(
        radial-gradient(#000 50%, #0000 0)
        @plot(r: .8) / 5px 5px
        no-repeat
      );
    `,
});
