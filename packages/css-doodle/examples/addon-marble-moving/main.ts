// Marble options as math in t: drops fall in, a comb sways, ink curls
import '@css-doodle/addons/marble';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @use: marble;
    @grid: 1 / 100%;
    @content: @marble(
      colors: #f4ecd8, #1d3557, #e63946, #f1c453;
      drops: min(t * 5, 40);
    );
`;
const v1 = `
    @use: marble;
    @grid: 1 / 100%;
    @content: @marble(
      colors: #f4ecd8, #1d3557, #e63946, #f1c453;
      comb: 6% (90deg + 20deg * sin(t));
    );
`;
const v2 = `
    @use: marble;
    @grid: 1 / 100%;
    @content: @marble.ink(
      colors: #fbf7ee, #0a3d91, #ffc400, #d6336c;
      warp: 2 + sin(t);
    );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  stage.variants(doodle, [
    { label: 'drops: min(t * 5, 40)', code: v0 },
    { label: 'comb angle sways', code: v1 },
    { label: 'warp: 2 + sin(t)', code: v2 },
  ], 5000);
  stage.say("t is the shader's time in seconds");
  return () => stage.dispose();
};

export default mount;
