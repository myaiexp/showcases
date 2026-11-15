// @svg is a url() for background, mask or border-image
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "background", code: `
      @grid: 1 / 100%;
      background: #000 @svg(
        viewBox: 0 0 10 10;
        circle*25 { cx: $(mod(n - 1, 5) * 2 + 1); cy: $(floor((n - 1) / 5) * 2 + 1); r: .8; fill: #ebbf4d }
      );
    ` },
      { label: "mask", code: `
      @grid: 1 / 100%;
      background: linear-gradient(135deg, #e6437d, #ebbf4d);
      mask: @svg(
        viewBox: 0 0 10 10;
        circle*25 { cx: $(mod(n - 1, 5) * 2 + 1); cy: $(floor((n - 1) / 5) * 2 + 1); r: .8; fill: #000 }
      );
    ` },
      { label: "border-image", code: `
      @grid: 1 / 100%;
      box-sizing: border-box;
      border: 40px solid #0000;
      border-image: @svg(
        viewBox: 0 0 10 10;
        circle*25 { cx: $(mod(n - 1, 5) * 2 + 1); cy: $(floor((n - 1) / 5) * 2 + 1); r: .8; fill: #e6437d }
      ) 30 / 40px round;
    ` },
    ],
    say: "One image, three properties",
});
