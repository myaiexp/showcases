// animate transform: rotate 0; 90 spins squares
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -6 -6 12 12;
        fill: none;
        stroke: #000;
        stroke-width: .2;
        rect*4 {
          x, y: $(-@n);
          width, height: $(@n * 2);
          animate transform: rotate 0; 90 / @n(*2)s infinite;
        }
      );
    `,
    say: "animate transform: rotate 0; 90 / @n(*2)s infinite",
});
