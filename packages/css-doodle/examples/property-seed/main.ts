// @seed in the code fixes the picture; a nested @doodle draws from the parent
import { simple } from '../../shared/a-kit.ts';

export default simple({
  doodles: [
    { label: "@seed: 1234567", code: `
      @grid: 6 / 100% _1px;
      @seed: 1234567;
      background: @p(#fff, #e6437d, #ebbf4d);
      scale: @r(.5, 1);
      animation: b 1.6s ease-in-out infinite alternate;
      animation-delay: calc(@i * -.1s);
      @keyframes b {
        to { rotate: 20deg }
      }
    ` },
    { label: "@seed: @p(1, 2)", code: `
      @grid: 4 / 100% _4px;
      background: @doodle(
        @seed: @p(1, 2);
        @grid: 4 / 100%;
        background: @p(#fff, #e6437d, #ebbf4d);
      );
    ` },
  ],
  reroll: true,
});
