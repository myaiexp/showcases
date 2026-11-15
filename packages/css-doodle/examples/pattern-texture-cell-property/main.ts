// Textures see the cell's custom properties
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 2 / 100% / #101820 _4px;
    --c: @pn(#e63946, #fca311, #2a9d8f, #3a86ff);
    @content: @pattern(
      texture0 {
        @shape: circle;
        background: var(--c);
      }
      fill: texture(texture0, 3uv + vec2(t * .2, 0));
    );
  `,
  say: "Same pattern code, a different --c per cell",
});
