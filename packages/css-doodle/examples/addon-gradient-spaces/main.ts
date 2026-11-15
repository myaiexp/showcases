// The same mesh gradient mixed in oklab, srgb and srgb-linear
import '@css-doodle/addons/gradient-2d';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @use: gradient-2d;
    @grid: 1 / 100%;
    background: @mesh-gradient(
      blue yellow,
      red lime
    );
`;
const v1 = `
    @use: gradient-2d;
    @grid: 1 / 100%;
    background: @mesh-gradient(
      in srgb,
      blue yellow,
      red lime
    );
`;
const v2 = `
    @use: gradient-2d;
    @grid: 1 / 100%;
    background: @mesh-gradient(
      in srgb-linear,
      blue yellow,
      red lime
    );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  stage.variants(doodle, [
    { label: 'oklab (default)', code: v0 },
    { label: 'in srgb', code: v1 },
    { label: 'in srgb-linear', code: v2 },
  ]);
  stage.say('Watch the middle: each space mixes the corners differently');
  return () => stage.dispose();
};

export default mount;
