// A scene as a background: fixed images, one per cell
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 3 / 100% / #14213d _3px;
    background: @scene(
      torus { r: .4 .15; rotate: 1 1 0 @r(360); fill: @p(#e63946, #fca311, #2a9d8f, #3a86ff) }
      view: 0 0;
    );
  `,
  reroll: true,
  say: "A background draws once per redraw",
});
