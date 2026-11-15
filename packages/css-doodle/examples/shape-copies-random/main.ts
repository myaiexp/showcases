// Functions run once per copy
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "@pn(-.6 0, .6 0)",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              circle*2 { scale: .5; move: @pn(-.6 0, .6 0) }
            );
        `,
      },
      {
        label: "@r scatter",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              circle*7 {
                scale: @r(.1, .3);
                move: @r(-.7, .7) @r(-.7, .7);
              }
            );
        `,
      },
    ],
    reroll: true,
});
