// draw: 3s infinite strokes a path along its length
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10 p 2;
        path {
          stroke: #000;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: .4;
          fill: none;
          draw: 3s infinite;
          d: M 0 0
             @M10.pn(0 @n @n 0, @n 0 0 @n)
             @M10.pn(@n @N @N @n, @N @n @n @N);
        }
      );
    `,
    say: "draw: 3s infinite",
});
