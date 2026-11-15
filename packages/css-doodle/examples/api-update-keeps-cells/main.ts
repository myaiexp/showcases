// Same grid keeps the cells (transitions run); a new grid rebuilds them
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const shapes = (grid: number): string => `
  @grid: ${grid} / 100% _2px;
  background: #000;
  transition: .8s;
  scale: @r(.3, 1);
  rotate: @r(360deg);
  border-radius: @p(0, 50%);
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  // Left: update() with the same grid. Right: update(code) with a new grid size each time.
  const kept = stage.doodle(shapes(6), { label: 'same grid: cells kept' });
  const rebuilt = stage.doodle(shapes(6), { label: 'new grid: rebuilt', editor: false });
  for (const d of [kept, rebuilt]) d.style.background = '#f4f1ea';

  let n = 6;
  const tick = (): void => {
    kept.update();
    n = n === 6 ? 5 : 6;
    rebuilt.update(shapes(n));
  };
  if (stage.bar) button(stage.bar, 'Update both', tick);
  else stage.every(1500, tick);
  stage.say('Same grid and content: only styles change, so transition: .8s animates');
  return () => stage.dispose();
};

export default mount;
