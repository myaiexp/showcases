// circle*N, *a-b, *NxM and *@ri() repeat forms
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "circle*6", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 16 16;
        circle*6 { cx: @n(*2); cy: 8; r: @n(*.2); fill: #000 }
      );
    ` },
      { label: "circle*3-7", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 16 16;
        circle*3-7 { cx: @n(*2); cy: 8; r: @n(*.2); fill: #000 }
      );
    ` },
      { label: "circle*4x4", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        circle*4x4 { cx: $(nx * 2 - 1); cy: $(ny * 2 - 1); r: .8; fill: #e6437d }
      );
    ` },
      { label: "circle*@ri(3, 8)", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 16 16;
        circle*@ri(3, 8) { cx: @n(*2); cy: 8; r: .8; fill: #000 }
      );
    ` },
    ],
    say: "Each variant repeats the circle differently",
});
