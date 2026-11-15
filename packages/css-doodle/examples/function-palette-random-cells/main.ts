// @p(@palette()) colors a grid of dots
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 10 / 100%;
      margin: 6%;
      border-radius: 50%;
      background: @p(@palette());
    `,
    reroll: true,
    say: "background: @p(@palette())",
});
