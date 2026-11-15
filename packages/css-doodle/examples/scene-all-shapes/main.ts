// The shapes: sphere, ellipsoid, box, cylinder, cone, torus and capsule
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @scene(
      sphere { r: .3; fill: #e63946; move: 1.0 0 0.0 }
      ellipsoid { r: .3 .18 .3; fill: #f4a261; move: 0.62 0 0.78 }
      box { size: .45 .4 .35; round: .04; fill: #e9c46a; move: -0.22 0 0.97 }
      cylinder { r: .2; height: .5; fill: #2a9d8f; move: -0.9 0 0.43 }
      cone { r: .3 .05; height: .5; fill: #3a86ff; move: -0.9 0 -0.43 }
      torus { r: .25 .09; rotate: x 60; fill: #8338ec; move: -0.22 0 -0.97 }
      capsule { from: 0.62 -.2 -0.78; to: 0.62 .2 -0.78; r: .14; fill: #ff006e }
      view: 20t 35;
    );
  `,
  say: "Seven shapes, each with its own sizes",
});
