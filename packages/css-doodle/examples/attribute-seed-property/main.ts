// the seed attribute says 2025, @seed says 1234567, and the property wins
import { simple } from '../../shared/a-kit.ts';

export default simple({
  doodles: [
    { label: "seed=\"2025\"", code: `
      @grid: 6 / 100% _1px;
      background: @p(#fff, #e6437d, #ebbf4d);
      scale: @r(.5, 1);
      animation: b 1.6s ease-in-out infinite alternate;
      animation-delay: calc(@i * -.1s);
      @keyframes b {
        to { rotate: 25deg }
      }
    ` },
    { label: "+ @seed: 1234567", code: `
      @grid: 6 / 100% _1px;
      @seed: 1234567;
      background: @p(#fff, #e6437d, #ebbf4d);
      scale: @r(.5, 1);
      animation: b 1.6s ease-in-out infinite alternate;
      animation-delay: calc(@i * -.1s);
      @keyframes b {
        to { rotate: 25deg }
      }
    ` },
  ],
  attrs: {"seed":"2025"},
});
