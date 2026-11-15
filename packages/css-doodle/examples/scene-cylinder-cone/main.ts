// Shapes: a cylinder and a cone make a pencil
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @scene(
      cylinder { r: .3; height: .8; fill: #fc0 }
      cone { r: .4 0; height: .6; move: 0 .7 0; fill: #f06 }
      view: 60t 20;
    );
  `,
  say: "The camera turns with time here; the model stays put",
});
