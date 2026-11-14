// css-doodle example: $(@t / 10)deg: math around a live value is written out as calc()
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// @t is the time; it is a CSS variable, so css-doodle writes the math around
// it as calc() instead of a number. @i(*7) gives each cell its own offset.
const code = `
    @grid: 7 / 100% / #111 _4px;
    background: hsl(@i(*7) 70% 60%);
    border-radius: 30% 0;
    rotate: $(@t / 10 + @i * 7)deg;
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  stage.doodle(code);
  stage.say('rotate: $(@t / 10 + @i * 7)deg → calc((var(--cssd-utime) / 10 + …) * 1deg)');
  return () => stage.dispose();
};

export default mount;
