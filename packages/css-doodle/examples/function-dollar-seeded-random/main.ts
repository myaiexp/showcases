// random(i) and random(i + 1) join cells into a skyline
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 24x1 / 100%;
      background: #000;
      clip-path: polygon(
        0 100%, 0 $%(20 + 60 * random(i)),
        100% $%(20 + 60 * random(i + 1)), 100% 100%
      );
    `,
    reroll: true,
    say: "The same random(i + 1) closes one cell and opens the next",
});
