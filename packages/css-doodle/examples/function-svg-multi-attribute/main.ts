// A single value sets every attribute, drawn once
import { show } from '../../shared/c-kit.ts';

export default show({
    doodles: [
      { label: "cx, cy: @r(10)", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        circle*30 { cx, cy: @r(10); r: .4; fill: #000 }
      );
    ` },
      { label: "cx: @r; cy: @r", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        circle*30 { cx: @r(10); cy: @r(10); r: .4; fill: #000 }
      );
    ` },
    ],
    reroll: true,
    say: "One draw for both, or one each",
});
