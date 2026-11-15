// @freeform-gradient(): each colour blends out from its own position
import '@css-doodle/addons/gradient-2d';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @use: gradient-2d;
    @grid: 1 / 100%;
    background: @freeform-gradient(
      red at top left,
      gold at 70% 30%,
      teal at bottom
    );
`;
const v1 = `
    @use: gradient-2d;
    @grid: 1 / 100%;
    background: @freeform-gradient(
      red at top left,
      gold 20% at 70% 30%,
      teal at bottom
    );
`;
const v2 = `
    @use: gradient-2d;
    @grid: 1 / 100%;
    background: @freeform-gradient(
      #3a0ca3 at top left,
      #f72585 at bottom right,
      white
    );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  stage.variants(doodle, [
    { label: 'positions', code: v0 },
    { label: 'gold 20% spread', code: v1 },
    { label: 'no position', code: v2 },
  ]);
  stage.say('A spread keeps a colour solid out to that radius');
  return () => stage.dispose();
};

export default mount;
