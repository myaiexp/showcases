// Without @seed each nested doodle differs; with one, every cell shares one image
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @grid: 4 / 100% / #f5f5f0 _3px;
    background: @doodle(
      @grid: 3 / 100%;
      background: @p(#1d3557, #e63946, #a8dadc);
      clip-path: @p(circle(50%), polygon(0 0, 100% 0, 0 100%));
    );
`;
const v1 = `
    @grid: 4 / 100% / #f5f5f0 _3px;
    background: @doodle(
      @seed: tile;
      @grid: 3 / 100%;
      background: @p(#1d3557, #e63946, #a8dadc);
      clip-path: @p(circle(50%), polygon(0 0, 100% 0, 0 100%));
    );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  stage.variants(doodle, [
    { label: 'no @seed', code: v0 },
    { label: '@seed: tile', code: v1 },
  ]);
  stage.say('Without @seed every cell differs; with @seed: one shared image');
  return () => stage.dispose();
};

export default mount;
