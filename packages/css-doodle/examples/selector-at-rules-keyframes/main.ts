// keyframes with functions get one animation per cell; without, cells share one
import { simple } from '../../shared/a-kit.ts';

export default simple({
  doodles: [
    { label: "per cell", code: `
      @grid: 6 / 100% _2px;
      background: #e6437d;
      animation: spin @r(2s, 5s) linear infinite;
      animation-delay: @r(-5s);
      
      @keyframes spin {
        from { rotate: 0deg }
        to   { rotate: @p(360deg, -360deg) }
      }
    ` },
    { label: "shared", code: `
      @grid: 8 / 100% _2px;
      background: #333;
      
      @cell(random .3) {
        animation: pulse 1s ease-in-out infinite alternate;
        @keyframes pulse {
          to { scale: .2; background: #e6437d }
        }
      }
    ` },
  ],
  reroll: true,
});
