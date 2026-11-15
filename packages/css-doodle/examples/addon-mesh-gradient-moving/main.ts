// A mesh-gradient point that circles with t, the shader's time in seconds
import '@css-doodle/addons/gradient-2d';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// A position in parentheses is math, as in @pattern; t is the time in seconds.
// A moving gradient draws faster in @content (a live canvas) than in background.
const code = `
    @use: gradient-2d;
    @grid: 1 / 100%;
    @content: @mesh-gradient(
      #f43 gold #0bf,
      #a0f white at (50% + 25% * sin(t)) (50% + 25% * cos(t)) #0c6,
      navy #f0a teal
    );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  stage.doodle(code);
  stage.say('white at (50% + 25% * sin(t)) (50% + 25% * cos(t))');
  return () => stage.dispose();
};

export default mount;
