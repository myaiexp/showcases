// The font command for text
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "900 serif",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              text: R;
              font: 900 serif;
              scale: .9;
            );
        `,
      },
      {
        label: "italic 700 serif",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              text: R;
              font: italic 700 serif;
              scale: .9;
            );
        `,
      },
      {
        label: "300 sans-serif",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              text: R;
              font: 300 sans-serif;
              scale: .9;
            );
        `,
      },
      {
        label: "900 monospace",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              text: R;
              font: 900 monospace;
              scale: .9;
            );
        `,
      },
    ],
    say: "font: <style> <weight> <family>, no size",
});
