// border-image: @doodle90(...) 33.34% round: a 3 × 3 doodle cut into a frame
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @grid: 1 / 100%;
    border: 30px solid;
    border-image: @doodle90(
      @grid: 3 / 100%;
      background: #f5f5f0;
      clip-path: @shape(clover 4);
      @nth(1, 3, 7, 9) { background: #e6437d; }
    ) 33.34% round;
`;
const v1 = `
    @grid: 1 / 100%;
    border: 30px solid;
    border-image: @doodle90(
      @grid: 3 / 100%;
      background: #f5f5f0;
      border-radius: 50%;
      @nth(2, 4, 6, 8) { background: #ebbf4d; }
    ) 33.34% round;
`;
const v2 = `
    @grid: 1 / 100%;
    border: 30px solid;
    border-image: @doodle180(
      @grid: 6 / 100%;
      background: @p(#f5f5f0, #e6437d);
      clip-path: @shape(clover 4);
    ) 33.34% round;
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  stage.variants(doodle, [
    { label: 'clover 4, corners pink', code: v0 },
    { label: 'circles, edges gold', code: v1 },
    { label: '6 × 6 grid', code: v2 },
  ]);
  stage.say('A grid that is a multiple of 3 puts the cuts on cell edges');
  return () => stage.dispose();
};

export default mount;
