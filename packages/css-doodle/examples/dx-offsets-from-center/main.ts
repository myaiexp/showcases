// Offsets from the center: @dx and @dy
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: ${v} / 100% _1px / #000;
  background: #000;
  color: #fff;
  font-size: .8em;
  @content: @dx;
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`7`));
  stage.variants(doodle, [
    { label: '7 × 7 @dx', code: code(`7`) },
    { label: '4 × 4 @dx', code: code(`4`) },
  ]);
  stage.say('@dx is -3 … 3 across seven columns, -1.5 … 1.5 across four');
  return () => stage.dispose();
};

export default mount;
