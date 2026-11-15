// A row of 48px avatars, one per name, set with the seed attribute
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const PEOPLE = ['grace', 'ada', 'alan', 'katherine', 'linus', 'margaret', 'edsger', 'barbara'];

// The code has no @seed: each element's seed attribute picks its picture.
const code = `
  @grid: 5 / 48px / #f0f0f0 ^.82;
  --bits: @once.ri(65535);
  background: hsl(@once.r(360) 55% 55%);
  opacity: $(floor(bits / 2 ^ (5 * abs(@dx) + @y)) % 2);
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const count = ctx.preview ? 4 : PEOPLE.length;
  const avatars = PEOPLE.slice(0, count).map((name, i) =>
    stage.doodle(code, { frame: 'free', attrs: { seed: name }, label: name, editor: i === 0 }),
  );

  // Cards shift the names along: setting the seed property writes the attribute
  // and re-renders that avatar.
  let offset = 0;
  if (ctx.preview) {
    stage.every(2000, () => {
      offset++;
      avatars.forEach((a, i) => {
        const name = PEOPLE[(i + offset) % PEOPLE.length]!;
        a.seed = name;
        a.nextElementSibling!.textContent = name;
      });
    });
  }
  stage.say('seed="name": same text, same picture, nothing stored');
  return () => stage.dispose();
};

export default mount;
