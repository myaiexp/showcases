// Motion: values that read t move the scene
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @scene(
      box { size: .6; round: .08; rotate: 1 1 0 90t; fill: #fc0 }
      sphere { r: .15; move: .8cos(2t) .3sin(2t) .8sin(2t); fill: #f06 }
      view: -30t 20;
    );
  `,
  say: "The camera fits the model over its first 2π seconds",
});
