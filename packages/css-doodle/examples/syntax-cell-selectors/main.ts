// @cell(x = y, x + y = 10) and @cell not (dr < 3) pick cells by expression
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @grid: 9 / 100% _1px;
    background: #eee;
`;
const v1 = `
    @grid: 9 / 100% _1px;
    background: #eee;
    @cell(x = y, x + y = 10) {
      background: #000;
    }
`;
const v2 = `
    @grid: 9 / 100% _1px;
    background: #eee;
    @cell(x = y, x + y = 10) {
      background: #000;
    }
    @cell not (dr < 3) {
      border-radius: 50%;
    }
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  stage.variants(doodle, [
    { label: 'no blocks', code: v0 },
    { label: '+ diagonals', code: v1 },
    { label: '+ not (dr < 3)', code: v2 },
  ]);
  stage.say('Several arguments mean any of them; not inverts the test');
  return () => stage.dispose();
};

export default mount;
