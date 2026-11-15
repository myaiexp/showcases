// px: a stroke that stays two pixels wide at any size
import { createStage } from '../../shared/stage.ts';
import type { Mount } from '@/types.ts';

const code = (w: string, size: number): string => `
  @grid: 1 / ${size}px;
  @content: @pattern(
    fill: #14213d;
    fill: #fca311, shape(abs(box(pos, .3 + .06sin(t))), ${w});
    fill: #fff, shape(abs(length(pos) - .2), ${w});
  );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const runs: [string, number][] = ctx.preview
    ? [['2px', 56], ['2px', 110]]
    : [['.02', 80], ['.02', 220], ['2px', 80], ['2px', 220]];
  runs.forEach(([w, size], i) => stage.doodle(code(w, size), { frame: 'free', label: `width ${w}, ${size}px`, editor: i === 3 }));
  stage.say('Width .02 grows with the box; width 2px stays two pixels');
  return () => stage.dispose();
};

export default mount;
