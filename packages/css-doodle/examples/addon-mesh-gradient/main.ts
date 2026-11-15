// @mesh-gradient(): rows of colours blended smoothly, one point moved with at
import '@css-doodle/addons/gradient-2d';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// The import puts the addon on the page, so @use finds it and fetches nothing.
const v0 = `
    @use: gradient-2d;
    @grid: 1 / 100%;
    background: @mesh-gradient(
      #f43 gold #0bf,
      #a0f white at 40% 60% #0c6,
      navy #f0a teal
    );
`;
const v1 = `
    @use: gradient-2d;
    @grid: 1 / 100%;
    background: @mesh-gradient(red gold, teal navy);
`;
const v2 = `
    @use: gradient-2d;
    @grid: 1 / 100%;
    background: @mesh-gradient(#264653 #2a9d8f #e9c46a #f4a261 #e76f51);
`;
const v3 = `
    @use: gradient-2d;
    @grid: 1 / 100%;
    background: @mesh-gradient(
      #ff006e #8338ec #3a86ff,
      #ffbe0b,
      #fb5607 #3a86ff
    );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  stage.variants(doodle, [
    { label: '3 × 3, one point moved', code: v0 },
    { label: '2 × 2', code: v1 },
    { label: 'one row', code: v2 },
    { label: 'short rows', code: v3 },
  ]);
  stage.say('Rows are separated by commas, colours in a row by spaces');
  return () => stage.dispose();
};

export default mount;
