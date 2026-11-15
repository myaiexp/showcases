// @stripe with widths on a round conic gradient
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      border-radius: 50%;
      background: conic-gradient(
        @stripe(#000 10%, #e6437d 20%, #ebbf4d 30%, #321f35)
      );
    `,
    say: "@stripe(#000 10%, #e6437d 20%, #ebbf4d 30%, #321f35)",
});
