// :doodle reaches the host element that top-level rules never touch
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    :doodle {
      @grid: 5 / 100%;
      outline: 4px solid #e6437d;
      border-radius: 8px;
    }
    background: #e6437d;
    margin: 25%;
    animation: p 1.4s ease-in-out infinite alternate;
    animation-delay: calc(@i * -.1s);
    @keyframes p {
      to { scale: .4 }
    }
  `,
});
