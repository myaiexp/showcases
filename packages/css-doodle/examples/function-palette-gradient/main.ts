// A palette as the stops of a radial gradient
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: radial-gradient(@palette(3));
    `,
    reroll: true,
    say: "radial-gradient(@palette(3)): a new blend on every seed",
});
