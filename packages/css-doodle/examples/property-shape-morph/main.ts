// @shape in keyframes morphs a circle into a heart
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    background: #e6437d;
    animation: m 1.5s ease-in-out infinite alternate;
    @keyframes m {
      from { clip-path: @shape(circle; points: 180) }
      to { clip-path: @shape(heart) }
    }
  `,
});
