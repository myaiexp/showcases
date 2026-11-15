// A small displacement on text makes it hand-drawn
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "scale 6", code: `
      @grid: 1 / 100%;
      color: #111;
      font: bold 3.4em sans-serif;
      @content: Wavy;
      filter: @svg-filter(.04, 6);
    ` },
      { label: "scale 14", code: `
      @grid: 1 / 100%;
      color: #111;
      font: bold 3.4em sans-serif;
      @content: Wavy;
      filter: @svg-filter(.04, 14);
    ` },
      { label: "scale 28", code: `
      @grid: 1 / 100%;
      color: #111;
      font: bold 3.4em sans-serif;
      @content: Wavy;
      filter: @svg-filter(.04, 28);
    ` },
    ],
    say: "@svg-filter(.04, 6) · .04, 14 · .04, 28",
});
