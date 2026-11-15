// The noise seed follows the doodle seed unless fixed
import { show } from '../../shared/c-kit.ts';

export default show({
    doodles: [
      { label: "doodle seed", code: `
      @grid: 1 / 100%;
      @size: 80%;
      margin: auto;
      background: #000;
      border-radius: 50%;
      filter: @svg-filter(.02, 30);
    ` },
      { label: "seed 7", code: `
      @grid: 1 / 100%;
      @size: 80%;
      margin: auto;
      background: #000;
      border-radius: 50%;
      filter: @svg-filter(.02, 30, 1, 7);
    ` },
    ],
    reroll: true,
    say: "Redraw: only the left disc changes",
});
