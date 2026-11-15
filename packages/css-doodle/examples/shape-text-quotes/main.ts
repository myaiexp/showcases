// Quoted text and emoji
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "';)'",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              text: ';)';
              font: 900 sans-serif;
              scale: .9;
            );
        `,
      },
      {
        label: "Emoji",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              text: 🐢;
              scale: .9;
            );
        `,
      },
      {
        label: "'(a, b);'",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              text: '(a, b);';
              font: 900 sans-serif;
              scale: .9;
            );
        `,
      },
    ],
});
