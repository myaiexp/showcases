// Cell index with @i and @I
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 5 / 100% _1px / #000;
  background: #000;
  color: #fff;
  @content: ${v};
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`@i`));
  stage.variants(doodle, [
    { label: '@i', code: code(`@i`) },
    { label: '@I', code: code(`@I`) },
    { label: '@i of @I', code: code(`@i / @I`) },
    { label: '@index', code: code(`@index`) },
    { label: '@size', code: code(`@size`) },
  ]);
  stage.say('@i counts cells from 1; @I is how many there are');
  return () => stage.dispose();
};

export default mount;
