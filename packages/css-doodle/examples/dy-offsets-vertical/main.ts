// Vertical offset and angle: @dy and @da
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 7 / 100% _1px / #000;
  background: #000;
  color: #fff;
  font-size: .6em;
  @content: ${v};
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`@dy`));
  stage.variants(doodle, [
    { label: '@dy', code: code(`@dy`) },
    { label: '@da', code: code(`@da(*100, /100)`) },
    { label: '@db', code: code(`@db`) },
    { label: '@dx, @dy', code: code(`@dx @dy`) },
  ]);
  stage.say('@dy, @da and @db measure from the center or the edge');
  return () => stage.dispose();
};

export default mount;
