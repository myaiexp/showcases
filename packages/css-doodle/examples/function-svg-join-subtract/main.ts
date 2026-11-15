// subtract { } cuts holes, smooth rounds the joins
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "no smooth", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -5 -5 10 10;
        subtract {
          fill: #000;
          circle { r: 4.5 }
          circle*8 { r: 1.1; cx, cy: @Plot(r: 4.5) }
          circle { r: 1.5 }
        }
      );
    ` },
      { label: "smooth: .3", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -5 -5 10 10;
        subtract {
          fill: #000;
          smooth: .3;
          circle { r: 4.5 }
          circle*8 { r: 1.1; cx, cy: @Plot(r: 4.5) }
          circle { r: 1.5 }
        }
      );
    ` },
      { label: "smooth: .8", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -5 -5 10 10;
        subtract {
          fill: #000;
          smooth: .8;
          circle { r: 4.5 }
          circle*8 { r: 1.1; cx, cy: @Plot(r: 4.5) }
          circle { r: 1.5 }
        }
      );
    ` },
    ],
    say: "smooth: .3 rounds the notches",
});
