// Stops that rise and fall shade a ring like a tube
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 6 / 100%;
      background: @svg(
        viewBox: 10;
        g {
          transform: rotate(@p(0, 90) 5 5);
          fill: @radialGradient(
            #000 43% 0, #000 43%, #e6437d 57%,
            #ebbf4d 71%, #e6437d 86%, #000
          );
          circle { r: 7 }
          circle { cx, cy: 10; r: 7 }
        }
      );
    `,
    reroll: true,
    say: "transform: rotate(@p(0, 90) 5 5)",
});
