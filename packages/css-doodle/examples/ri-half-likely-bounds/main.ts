// the half-likely bounds of @ri
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 30 / 100% / #14141a;
    @content: @ri(1, 6);
    color: #fff;
    font: 700 9px / 1 monospace;
  `);
  stage.reroll(doodle);
  doodle.addEventListener('render', () => {
    const counts = [0, 0, 0, 0, 0, 0, 0];
    for (const cell of doodle.shadowRoot?.querySelectorAll('cell') ?? []) {
      const n = Number(cell.textContent);
      if (n >= 1 && n <= 6) counts[n]!++;
    }
    stage.say(`1:${counts[1]}  2:${counts[2]}  3:${counts[3]}  4:${counts[4]}  5:${counts[5]}  6:${counts[6]}`);
  });
  return () => stage.dispose();
};

export default mount;
