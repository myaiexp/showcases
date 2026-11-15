// @marble.ink(): soft clouds of ink that curl and drift
import '@css-doodle/addons/marble';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @use: marble;
    @grid: 1 / 100%;
    @content: @marble.ink(
      colors: #111, #ffd166, #ef476f, #06d6a0;
      scale: 1.5;
      warp: 3;
      flow: 1;
    );
`;
const v1 = `
    @use: marble;
    @grid: 1 / 100%;
    @content: @marble.ink(
      colors: #111, #ffd166, #ef476f, #06d6a0;
      scale: 1.5;
      warp: 0;
      flow: 1;
    );
`;
const v2 = `
    @use: marble;
    @grid: 1 / 100%;
    @content: @marble.ink(
      colors: #fbf7ee, #0a3d91, #ffc400, #d6336c;
      scale: 4;
      warp: 2;
      flow: 1;
    );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  stage.variants(doodle, [
    { label: 'flow: 1', code: v0 },
    { label: 'warp: 0', code: v1 },
    { label: 'scale: 4', code: v2 },
  ], 4000);
  stage.say('First colour is the water; flow makes the clouds drift');
  return () => stage.dispose();
};

export default mount;
