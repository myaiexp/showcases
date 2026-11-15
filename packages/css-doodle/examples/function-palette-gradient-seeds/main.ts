// About one palette in four is a smooth gradient
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 9x1 / 100%;
      background: @pn(@palette(9));
    `,
    reroll: true,
    say: "Redraw until a smooth ramp shows up",
});
