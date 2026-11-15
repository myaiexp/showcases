// Set doodle.grid to change the grid attribute; read it back as an object
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const GRIDS = ['3x4', '5', '8x3', '12x12', '2x7'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  // No @grid in the code: a @grid would win over the grid attribute.
  const doodle = stage.doodle(
    `
    :doodle {
      width: 100%;
      height: 100%;
      background: #111;
      gap: 2px;
    }
    background: hsl(@i(*20) 65% 60%);
    border-radius: 30%;
  `,
    { attrs: { grid: GRIDS[0]! } },
  );
  doodle.addEventListener('render', () => stage.say(`grid = ${JSON.stringify(doodle.grid)}`));

  const set = (g: string): void => {
    doodle.grid = g; // writes the grid attribute, which re-renders
  };
  if (stage.bar) for (const g of GRIDS) button(stage.bar, `grid = '${g}'`, () => set(g));
  else {
    let i = 0;
    stage.every(1800, () => set(GRIDS[(i = (i + 1) % GRIDS.length)]!));
  }
  return () => stage.dispose();
};

export default mount;
