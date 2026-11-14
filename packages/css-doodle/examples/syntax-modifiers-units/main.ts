// css-doodle example: @i(*10px) and @x(-1): a leading operator on a cell function modifies it
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @grid: 10x1 / 100% / #111;
    align-self: end;
    height: @x(*10%);
    background: hsl(@x(*36) 70% 60%);
`;
const v1 = `
    @grid: 10x1 / 100% / #111;
    align-self: end;
    height: $%(@x(-1) * 10 + 5);
    background: hsl(@x(*36) 70% 60%);
`;
const v2 = `
    @grid: 10x1 / 100% / #111;
    align-self: end;
    height: $%(@x * 10);
    background: hsl(@x(*36) 70% 60%);
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  stage.variants(doodle, [
    { label: '@x(*10%)', code: v0 },
    { label: '@x(-1)', code: v1 },
    { label: '$%(@x * 10)', code: v2 },
  ]);
  stage.say('@x(*10%) multiplies the column by 10%: a length per cell');
  return () => stage.dispose();
};

export default mount;
