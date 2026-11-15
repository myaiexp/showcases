// The ± shorthand
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 8 / 100% / #f5f5f0;
    @size: 70%;
    margin: auto;
    border: 1px solid #000;
    translate: @r(±20%) @r(±20%);
    rotate: @r(±25deg);
    transition: .8s;
  `);
  stage.reroll(doodle);
  stage.say('@r(±25deg) is @r(-25deg, 25deg)');
  return () => stage.dispose();
};

export default mount;
