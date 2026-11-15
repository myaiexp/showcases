// href: path { } is referenced as #id and also drawn
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 100 100;
        text {
          font-size: 9;
          fill: #000;
          textPath {
            href: path {
              d: M 10 70 Q 50 0 90 70;
              fill: none;
              stroke: #e6437d;
              stroke-width: .6;
            }
            content: Text along a curve;
          }
        }
      );
    `,
    say: "href: path { … } on a textPath",
});
