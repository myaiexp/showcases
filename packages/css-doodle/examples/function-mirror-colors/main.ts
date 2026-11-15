// @pn.mirror repeats a list backwards
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 6x1 / 100% _1px;
      background: @pn.mirror(#000, #e6437d, #ebbf4d);
    `,
    say: "@pn.mirror(#000, #e6437d, #ebbf4d): six cells from three colors",
});
