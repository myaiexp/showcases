// css-doodle example: a quilt avatar, one random quarter flipped into the other three
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const NAMES = ['grace', 'ada', 'alan', 'katherine', 'linus', 'margaret'];

// @once.doodle draws one 2 × 2 quarter for the whole grid; each of the four outer
// cells shows it, flipped by the sign of its offset from the centre.
const quilt = (name: string): string => `
  @grid: 2 / 100%;
  @seed: ${name};
  scale: $(sign(@dx)) $(sign(@dy));
  background: @once.doodle(
    @grid: 2 / 100% / @palette(1);
    background: @p.palette(4);
    clip-path: polygon(0 0, 100% 0, 0 100%);
    scale: @p(1, -1) @p(1, -1);
  );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(quilt(NAMES[0]!));
  stage.variants(doodle, NAMES.map((n) => ({ label: n, code: quilt(n) })), 1800);
  doodle.addEventListener('render', () => stage.say(`@seed: ${doodle.seed}`));
  return () => stage.dispose();
};

export default mount;
