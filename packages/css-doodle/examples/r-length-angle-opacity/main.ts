// A random length, angle and opacity
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 12 / 100% / #f5f5f0;
    @size: @r(40%, 100%) 2px;
    margin: auto;
    background: #000;
    opacity: @r(.25, 1);
    rotate: @r(180deg);
    transition: .8s;
  `);
  stage.reroll(doodle);
  stage.say('The values are chosen when the doodle is drawn, not over time');
  return () => stage.dispose();
};

export default mount;
