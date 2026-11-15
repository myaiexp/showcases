// 2400 letter cells scattered over a curve with @plot.scatter
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  // A card draws a third of the cells (and a smaller font) to stay light.
  const cells = ctx.preview ? 800 : 2400;
  // @plot.scatter spreads the cells over the area of the curve -x/-y draw;
  // @place puts each cell's centre there. @random(.05) recolours one in twenty.
  const doodle = stage.doodle(
    `
    @grid: 1x${cells} / 100% auto (16/9);
    font: ${ctx.preview ? 5 : 9}px monospace;
    color: #999;
    @content: @p('O', 'o');
    @random(.05) {
      @content: '⬮';
      color: @p(#d15c49, #372f96);
    }
    @place: @plot.scatter(
      scale: .061 .065;
      -x: 1.81(11cos(.6t) + cos(55t) - 2.8);
      -y: 2.5(11sin(9.03t) - sin(77t)) + 16;
    );
  `,
    { frame: 'wide' },
  );
  stage.reroll(doodle, 2600);
  return () => stage.dispose();
};

export default mount;
