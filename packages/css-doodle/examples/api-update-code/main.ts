// update() redraws with a new seed; update(code) replaces the code
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const dots = `
  @grid: 6 / 100% / #111;
  background: @p(#000, #e6437d);
`;
const leaves = `
  @grid: 6 / 100% / #111 _2px;
  background: @p(#f4d35e, #42c6ff);
  border-radius: @p(100% 0, 0 100%);
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(dots, { editor: false });
  const log = (what: string): void => stage.say(`${what} → seed ${doodle.seed}`);
  doodle.addEventListener('render', () => log(last));
  let last = 'first render';

  const again = (): void => {
    last = 'update()';
    doodle.update(); // same code, new seed
  };
  let which = 0;
  const swap = (): void => {
    which = 1 - which;
    last = `update(${which ? 'leaves' : 'dots'})`;
    doodle.update(which ? leaves : dots); // new code
  };

  if (stage.bar) {
    button(stage.bar, 'update()', again);
    button(stage.bar, 'update(code)', swap);
  } else {
    // Two redraws with the same code, then a code swap.
    let n = 0;
    stage.every(1600, () => (++n % 3 === 0 ? swap() : again()));
  }
  return () => stage.dispose();
};

export default mount;
