// css-doodle example: $() comparisons give 1 or 0; (x-1) & (y-1) draws a Sierpinski triangle
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @grid: 32 / 100% / #111;
    background: #f4d35e;
    opacity: $(((x - 1) & (y - 1)) = 0);
`;
const v1 = `
    @grid: 32 / 100% / #111;
    background: #f4d35e;
    opacity: $(((x - 1) | (y - 1)) < 31);
`;
const v2 = `
    @grid: 32 / 100% / #111;
    background: #f4d35e;
    opacity: $((x * y) % 7 = 0);
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  stage.variants(doodle, [
    { label: '& (and)', code: v0 },
    { label: '| (or)', code: v1 },
    { label: '% (remainder)', code: v2 },
  ]);
  stage.say('A comparison gives 1 or 0: a ready-made opacity');
  return () => stage.dispose();
};

export default mount;
