// 300 circles placed by @n and $()
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      animation: turn 40s linear infinite;
      @keyframes turn { to { rotate: 360deg } }
      background: @svg(
        viewBox: -50 -50 100 100;
        circle*300 {
          fill: hsl($(120-90*@sin.n), 80%, 50%);
          r: @sqrt(@n/60);
          cx: $(@n*.618^4 * cos(2π*@n*.618));
          cy: $(@n*.618^4 * sin(2π*@n*.618));
        }
      );
    `,
    say: "cx and cy come from n × .618 and cos / sin of 2π n .618",
});
