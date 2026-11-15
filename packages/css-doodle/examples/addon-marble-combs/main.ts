// @marble() with one, two or three combs at different spacings and angles
import '@css-doodle/addons/marble';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @use: marble;
    @grid: 1 / 100%;
    background: @marble(#f4ecd8 #1d3557 #e63946 #f1c453 #2a9d8f);
`;
const v1 = `
    @use: marble;
    @grid: 1 / 100%;
    background: @marble(
      colors: #f4ecd8, #1d3557, #e63946, #f1c453, #2a9d8f;
      comb: 8%;
    );
`;
const v2 = `
    @use: marble;
    @grid: 1 / 100%;
    background: @marble(
      colors: #f4ecd8, #1d3557, #e63946, #f1c453, #2a9d8f;
      comb: 4% 0deg;
    );
`;
const v3 = `
    @use: marble;
    @grid: 1 / 100%;
    background: @marble(
      colors: #f4ecd8, #1d3557, #e63946, #f1c453, #2a9d8f;
      comb: 12% 90deg, 6% 0deg, 3% 45deg;
    );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0, { attrs: {"seed": "comb"} });
  stage.variants(doodle, [
    { label: 'colours only', code: v0 },
    { label: 'comb: 8%', code: v1 },
    { label: 'comb: 4% 0deg', code: v2 },
    { label: 'three combs', code: v3 },
  ]);
  stage.say('Same seed, same drops: only the combs change');
  return () => stage.dispose();
};

export default mount;
