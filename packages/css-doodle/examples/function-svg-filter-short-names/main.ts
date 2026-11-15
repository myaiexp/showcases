// blur, erode, dilate and region as declarations
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "blur", code: `
      @grid: 1 / 100%;
      @size: 80%;
      margin: auto;
      background: #000;
      border-radius: 50%;
      filter: @svg-filter(blur: 6);
    ` },
      { label: "dilate", code: `
      @grid: 1 / 100%;
      @size: 80%;
      margin: auto;
      background: #000;
      border-radius: 50%;
      filter: @svg-filter(dilate: 10);
    ` },
      { label: "erode", code: `
      @grid: 1 / 100%;
      @size: 80%;
      margin: auto;
      background: #000;
      border-radius: 50%;
      filter: @svg-filter(erode: 14);
    ` },
      { label: "blur + noise", code: `
      @grid: 1 / 100%;
      @size: 80%;
      margin: auto;
      background: #000;
      border-radius: 50%;
      filter: @svg-filter(blur: 3; frequency: .02; scale: 30;);
    ` },
      { label: "dilate + noise", code: `
      @grid: 1 / 100%;
      @size: 80%;
      margin: auto;
      background: #000;
      border-radius: 50%;
      filter: @svg-filter(dilate: 4; frequency: .03; scale: 25;);
    ` },
    ],
    say: "Written side by side, the names form one group",
});
