// @mirror doubles the middle, @Mirror does not
import { show } from '../../shared/c-kit.ts';

export default show({
    doodles: [
      { label: "@mirror", code: `
      @grid: 6x1 / 100% _1px;
      background: @pn.mirror(#000, #e6437d, #ebbf4d);
    ` },
      { label: "@Mirror", code: `
      @grid: 5x1 / 100% _1px;
      background: @pn.Mirror(#000, #e6437d, #ebbf4d);
    ` },
    ],
    say: "1 2 3 3 2 1 against 1 2 3 2 1",
});
