// Commands on path data
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "One half",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              path: M12 21 C4 15 2 11 2 8 C2 5 4 3 7 3 C9 3 11 4 12 6 Z;
              scale: .9;
            );
        `,
      },
      {
        label: "mirror: x",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              path: M12 21 C4 15 2 11 2 8 C2 5 4 3 7 3 C9 3 11 4 12 6 Z;
              scale: .9;
              mirror: x;
            );
        `,
      },
    ],
});
