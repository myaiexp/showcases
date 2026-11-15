// 2400 SVG circles placed along a curve with @Plot, sized by a sine
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  // circle*2400 repeats the element; inside it @n counts the copies, @N is 2400.
  // `cx, cy:` sets both attributes from one @Plot point on a polar curve r(t).
  const doodle = stage.doodle(
    `
    @grid: 1 / 100% auto (16/9);
    --c: #b6a8f2, #f2a7b8, #422abf x3, #1c1b1b;
    @content: @svg(
      viewBox: -57 -57 114 114;
      stroke-linejoin: round;
      circle*2400 {
        fill: @p(--c);
        r: $(.37 + abs.sin(8π/@N*@n(-1)*2));
        cx, cy: @Plot(
          r: 50 + 8*(sin(9t)*tan(14t) + tan(3t));
        );
      };
    );
  `,
    { frame: 'wide' },
  );
  // A new seed changes only the colours: the curve is deterministic.
  stage.reroll(doodle, 2600);
  return () => stage.dispose();
};

export default mount;
