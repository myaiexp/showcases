// @google-font in the full view, a system font in the card
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// The code is the docs' snippet; `font` is its font-family line.
const code = (font: string): string => `
  @grid: 4 / 100% _1px;
  background: #000;
  color: #fff;
  font-family: ${font};
  font-size: 2em;
  @content: @p([A-Z]);
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(ctx.preview ? code('Georgia, serif') : code('@google-font("Alfa Slab One")'));
  if (ctx.preview) {
    // Cards never fetch: the same letters in a system font, redrawn every few seconds.
    stage.every(2400, () => doodle.update());
    stage.say('Georgia here; the full view loads Alfa Slab One');
    return () => stage.dispose();
  }
  stage.variants(doodle, [
    { label: 'quoted name', code: code('@google-font("Alfa Slab One")') },
    { label: 'Press Start 2P', code: code('@google-font("Press Start 2P")') },
    { label: 'no quotes', code: code('@google-font(Alfa Slab One)') },
  ]);
  stage.say('@google-font adds a stylesheet link on first use and fills in the family name');
  return () => stage.dispose();
};

export default mount;
