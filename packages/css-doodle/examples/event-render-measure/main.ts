// The render event fires once styles are in place, so sizes can be read
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

// The doodle's own size depends on the random grid: 4 to 9 columns of 20px cells.
const code = (cols: number): string => `
  @grid: ${cols}x3 / auto;
  @size: 20px;
  margin: 2px;
  background: hsl(@r(180, 300) 70% 60%);
  border-radius: @p(0, 50%);
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(5), { frame: 'free' });

  // In the handler the new grid is laid out: measure it.
  doodle.addEventListener('render', () => {
    const { width, height } = doodle.getBoundingClientRect();
    stage.say(`render: ${doodle.grid.x} × ${doodle.grid.y} cells measure ${Math.round(width)} × ${Math.round(height)} px`);
  });

  const next = (): void => doodle.update(code(4 + Math.floor(Math.random() * 6)));
  if (stage.bar) button(stage.bar, 'Another grid', next);
  else stage.every(1600, next);
  return () => stage.dispose();
};

export default mount;
