// @shape with @pn walks the whole list of shape names in order
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 5 / 100% _2px;
    @shape: @pn(circle, square, squircle, triangle, pentagon, hexagon, octagon, star, infinity, heart, fish, drop, bean, leaf, cross, vase, windmill, cloud, clover, hypocycloid, bud, none);
    background: #e6437d;
    animation: spin 5s linear infinite;
    animation-delay: calc(@i * -.2s);
    @keyframes spin {
      to { rotate: 1turn }
    }
  `,
});
