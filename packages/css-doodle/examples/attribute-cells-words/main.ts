// cells="#reader::words" makes each word a cell that an outline reads in turn
import type { Mount } from '@/types.ts';
import { paper } from '../../shared/a-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const reader = paper(stage, 'cd-cells-reader', 'It reads one careful word at a time.', 'p');
  stage.doodle(
    `
    font: 1.25rem sans-serif;
    border-radius: 2px;
    outline-offset: 1px;
    animation: read 4s calc(@i * .4s) infinite steps(1);
    @keyframes read {
      0% { outline: 2px solid #e6437d; }
      10% { outline: none; }
    }
  `,
    { attrs: { cells: '#cd-cells-reader::words' }, frame: 'free', parent: reader.parentElement! },
  );
  stage.say('::words: one cell per word');
  return () => stage.dispose();
};

export default mount;
