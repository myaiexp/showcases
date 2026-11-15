// The grid attribute with a third number nests cells into a chain of squares
import type { Mount } from '@/types.ts';
import { cycleAttr } from '../../shared/a-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(
    `
    :doodle {
      @size: 100%;
    }
    :container {
      scale: .6;
    }
    @size: 100%;
    box-shadow: inset 0 0 0 1px #e6437d;
    margin: 1px;
    border-radius: 100% 0 0 0;
    place-self: start;
    translate: -32% 0;
    transform-origin: 0 100%;
    @cell (i > 1) {
      @size: 61.8%;
      translate: 161.8% -100%;
      rotate: 90deg;
    }
  `,
    { attrs: { grid: '1x1x7' } },
  );
  cycleAttr(stage, doodle, 'grid', ['1x1x3', '1x1x5', '1x1x7', '1x1x9'], (v) => `grid="${v}": ${v.split('x')[2]} levels`);
  return () => stage.dispose();
};

export default mount;
