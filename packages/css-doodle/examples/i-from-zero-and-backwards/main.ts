// Counting from 0 and backwards with @i
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 5 / 100% _1px / #000;
  background: #000;
  color: #fff;
  
  @cell(y < 3) {
    @content: @i(-1);
  }
  @cell(y > 3) {
    @content: @I(-@i, +1);
  }
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`@grid: 5 / 100% _1px;
background: #000;
color: #fff;

@cell(y < 3) {
  @content: @i(-1);
}
@cell(y > 3) {
  @content: @I(-@i, +1);
}`));
  stage.variants(doodle, [
    { label: 'count 0..', code: code(`@grid: 5 / 100% _1px;
background: #000;
color: #fff;

@cell(y < 3) {
  @content: @i(-1);
}
@cell(y > 3) {
  @content: @I(-@i, +1);
}`) },
    { label: '3 × 3', code: code(`@grid: 3 / 100% _1px;
background: #000;
color: #fff;

@cell(y < 2) {
  @content: @i(-1);
}
@cell(y > 2) {
  @content: @I(-@i, +1);
}`) },
  ]);
  stage.say('Top rows start at 0; bottom rows count down to 1');
  return () => stage.dispose();
};

export default mount;
