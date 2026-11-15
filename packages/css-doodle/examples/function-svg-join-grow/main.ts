// union with grow: d outsets the joined shape
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "grow .8", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -5 -5 10 10;
        union*2 {
          fill: @pn(#e6437d, #000);
          grow: @pn(.8, 0);
          circle*5 { r: 1.2; cx, cy: @Plot(r: 2) }
        }
      );
    ` },
      { label: "grow 1.6", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -5 -5 10 10;
        union*2 {
          fill: @pn(#e6437d, #000);
          grow: @pn(1.6, 0);
          circle*5 { r: 1.2; cx, cy: @Plot(r: 2) }
        }
      );
    ` },
      { label: "grow in (-.4)", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -5 -5 10 10;
        union*2 {
          fill: @pn(#000, #e6437d);
          grow: @pn(0, -.4);
          circle*5 { r: 1.2; cx, cy: @Plot(r: 2) }
        }
      );
    ` },
    ],
    say: "grow: @pn(.8, 0)",
});
