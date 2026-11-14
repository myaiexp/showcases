// GitHub-style 5 × 5 avatars, mirrored, drawn from a name as the seed
import type { Mount } from '@/types.ts';
import { textInput } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const NAMES = ['grace', 'ada', 'alan', 'katherine', 'linus', 'margaret'];

// @once draws the random bits and the hue once for the whole grid. Each cell
// reads the bit at 5 × abs(@dx) + @y, which a column shares with its mirror.
const avatar = (name: string): string => `
  @grid: 5 / 100% / #f0f0f0 ^.82;
  @seed: ${name};
  --bits: @once.ri(65535);
  background: hsl(@once.r(360) 55% 55%);
  opacity: $(floor(bits / 2 ^ (5 * abs(@dx) + @y)) % 2);
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(avatar(NAMES[0]!));
  const show = stage.variants(
    doodle,
    NAMES.map((n) => ({ label: n, code: avatar(n) })),
    1800,
  );
  if (stage.bar) {
    textInput(stage.bar, 'any name', '', (v) => {
      if (v.trim()) stage.setCode(doodle, avatar(v.trim().replace(/[;{}()]/g, '')));
      else show(0);
    }, 14);
  }
  doodle.addEventListener('render', () => stage.say(`@seed: ${doodle.seed}: the same name always draws this picture`));
  return () => stage.dispose();
};

export default mount;
