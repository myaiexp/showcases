// A stored body with a free variable
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "n: 3",
        code: `
            :doodle {
              --gear: (points: 4n; r: 1, .5; fill-rule: evenodd);
            }
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape($gear; n: 3);
        `,
      },
      {
        label: "n: 5",
        code: `
            :doodle {
              --gear: (points: 4n; r: 1, .5; fill-rule: evenodd);
            }
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape($gear; n: 5);
        `,
      },
      {
        label: "n: 8",
        code: `
            :doodle {
              --gear: (points: 4n; r: 1, .5; fill-rule: evenodd);
            }
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape($gear; n: 8);
        `,
      },
      {
        label: "n: 12",
        code: `
            :doodle {
              --gear: (points: 4n; r: 1, .5; fill-rule: evenodd);
            }
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape($gear; n: 12);
        `,
      },
    ],
});
