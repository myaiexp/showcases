// The grid attribute steps through one number, n x m and other separators
import type { Mount } from '@/types.ts';
import { cycleAttr } from '../../shared/a-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(
    `
    :doodle {
      @size: 100%;
      gap: 3px;
    }
    background: #e6437d;
    color: #fff;
    font-size: 80%;
    @content: @x,@y;
  `,
    { attrs: { grid: '5' } },
  );
  // The attribute alone sets the dimensions; size, gap and fill come from the CSS above.
  cycleAttr(stage, doodle, 'grid', ['5', '5x2', '2x5', '5 x 3', '3,4', '5X5']);
  return () => stage.dispose();
};

export default mount;
