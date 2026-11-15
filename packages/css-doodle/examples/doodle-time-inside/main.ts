// @t keeps working inside a nested doodle: animated tiles inside cells
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = `
    @grid: 3 / 100% / #111 _4px;
    background: @doodle(
      @grid: 4 / 100%;
      background: hsl($(@t / 20 + @i * 20) 70% 60%);
      border-radius: 50%;
      scale: $(.5 + .4 * sin(@t / 400 + @i));
    );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  stage.doodle(code);
  stage.say('@t inside the nested code: every tile pulses');
  return () => stage.dispose();
};

export default mount;
