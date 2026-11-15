// Random letters with @r(a, z)
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 8 / 100% / #f5f5f0;
    @content: @r(a, z);
    font: 700 @ri(12, 28)px / 1 monospace;
    color: #000;
    opacity: @r(.25, 1);
  `);
  stage.reroll(doodle);
  stage.say('@r(a, z) is a letter from a to y');
  return () => stage.dispose();
};

export default mount;
