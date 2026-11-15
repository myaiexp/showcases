// One piece per cell with gap
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 24x1 / 100% / #111;
      background: @p(
        #f2efe6, #f2efe6, #f2efe6,
        #d7301f, #1f4e9c, #f5c400
      );
      clip-path: @tile(gap: 1.5);
    `,
    reroll: true,
});
