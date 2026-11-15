// @stripe(@palette(6)) cuts a palette into wedges
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      border-radius: 50%;
      background: conic-gradient(@stripe(@palette(6)));
    `,
    reroll: true,
    say: "conic-gradient(@stripe(@palette(6)))",
});
