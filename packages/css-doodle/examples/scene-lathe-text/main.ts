// lathe { text: 'abc' }: turning every letter
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @scene(
      lathe { text: 'abc'; fill: #3a86ff }
      view: 30t 25;
    );
  `,
  say: "Text starts at the axis",
});
