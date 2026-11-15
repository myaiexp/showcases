// @palette gives a seeded list of matching colors
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 5x1 / 100%;
      background: @pn(@palette());
    `,
    reroll: true,
    say: "@palette() is a comma list of five colors; the seed chooses it",
});
