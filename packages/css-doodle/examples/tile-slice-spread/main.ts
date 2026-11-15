// Slices with spread
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "spread: 0",
        code: `
            @grid: 30x1 / 100%;
            background: repeating-linear-gradient(
              @r(180)deg, #000 0 2px, #fff 0 6px
            );
            clip-path: @tile(spread: 0);
        `,
      },
      {
        label: "spread: 30",
        code: `
            @grid: 30x1 / 100%;
            background: repeating-linear-gradient(
              @r(180)deg, #000 0 2px, #fff 0 6px
            );
            clip-path: @tile(spread: 30);
        `,
      },
      {
        label: "spread: 90",
        code: `
            @grid: 30x1 / 100%;
            background: repeating-linear-gradient(
              @r(180)deg, #000 0 2px, #fff 0 6px
            );
            clip-path: @tile(spread: 90);
        `,
      },
      {
        label: "spread: 180",
        code: `
            @grid: 30x1 / 100%;
            background: repeating-linear-gradient(
              @r(180)deg, #000 0 2px, #fff 0 6px
            );
            clip-path: @tile(spread: 180);
        `,
      },
    ],
    reroll: true,
});
