// Two @trace() levels of one picture in an @svg: a print in two inks
import '@css-doodle/addons/trace';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { MOUNTAINS } from '../../shared/trace-images.ts';

const print = (low: string, high: string): string => `
  @use: trace;
  @grid: 1 / 100%;
  background: #fbe9d0 @svg(
    viewBox: 0 0 240 240;
    path*2 {
      d: @trace(${MOUNTAINS}, @pn(${high}, ${low}));
      fill: @pn(#e63946, #1d3557);
    }
  );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  // MOUNTAINS is an opaque picture (white, grey, near black): the ink is the dark part.
  const doodle = stage.doodle(print('30%', '70%'));
  stage.variants(doodle, [
    { label: '30% and 70%', code: print('30%', '70%') },
    { label: '20% and 50%', code: print('20%', '50%') },
    { label: '50% only', code: print('50%', '50%') },
  ]);
  stage.say('The path is in the image\'s own pixels, so both levels line up');
  return () => stage.dispose();
};

export default mount;
