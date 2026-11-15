// Path subpaths are contours
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "evenodd",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              path: M2 2 H22 V22 H2 Z M8 8 H16 V16 H8 Z;
              fill-rule: evenodd;
              scale: .9;
            );
        `,
      },
      {
        label: "nonzero",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              path: M2 2 H22 V22 H2 Z M8 8 H16 V16 H8 Z;
              scale: .9;
            );
        `,
      },
      {
        label: "opposite direction",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              path: M2 2 H22 V22 H2 Z M8 8 V16 H16 V8 Z;
              scale: .9;
            );
        `,
      },
    ],
});
