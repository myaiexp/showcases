// make the grid visible, from the Start from a grid guide
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @grid: 7 / 100% / #333 _ 2px;
    background: #fff;
`;
const v1 = `
    @grid: 4x8 / 100% / #333 _ 2px;
    background: #fff;
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  // One number makes a square grid, two set columns and rows.
  stage.variants(doodle, [
    { label: '7 × 7', code: v0 },
    { label: '4x8', code: v1 },
  ]);
  stage.say('One number makes a square grid; 4x8 is 4 columns by 8 rows.');
  return () => stage.dispose();
};

export default mount;
