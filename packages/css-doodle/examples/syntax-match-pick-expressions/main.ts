// match(test, value, …, else) and pick(k: a, b, c) choose values inside $()
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @grid: 11 / 100% / #111 _2px;
    background: #8ecae6;
    opacity: $(match(dr < 2, 1, dr < 4, .6, dr < 6, .3, .1));
`;
const v1 = `
    @grid: 11 / 100% / #111 _2px;
    background: #8ecae6;
    opacity: $(pick(@i: 1, .6, .3));
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  stage.variants(doodle, [
    { label: 'match()', code: v0 },
    { label: 'pick()', code: v1 },
  ]);
  stage.say('match(dr < 2, 1, dr < 4, .6, …, .1): rings by distance');
  return () => stage.dispose();
};

export default mount;
