// @svg's body: blocks are elements, declarations attributes, circle*8 repeats
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @grid: 1 / 100% / #f4f1ea;
    background: @svg(
      viewBox: 0 0 18 16;
      circle*8 {
        fill: #000;
        r: .7;
        cx: @n(*2);
        cy: 8;
      }
    );
`;
const v1 = `
    @grid: 1 / 100% / #f4f1ea;
    background: @svg(
      viewBox: 0 0 18 16;
      circle*4 {
        fill: #000;
        r: 1.4;
        cx: @n(*4);
        cy: 8;
      }
    );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  stage.variants(doodle, [
    { label: 'circle*8', code: v0 },
    { label: 'circle*4, r: 1.4', code: v1 },
  ]);
  stage.say('circle*8 repeats the element; @n(*2) spaces the copies');
  return () => stage.dispose();
};

export default mount;
