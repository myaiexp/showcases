// Shadows spread on both sides
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 1 / 100% / #f5f5f0;
  @size: 12%;
  @place: center;
  background: #000;
  box-shadow: @m${v}(
    calc(@nd * 14px) 0 0 #e6437d
  );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`7`));
  stage.variants(doodle, [
    { label: '7', code: code(`7`) },
    { label: '4', code: code(`4`) },
    { label: '11', code: code(`11`) },
  ]);
  stage.say('calc(@nd * 14px) is symmetric around the dot');
  return () => stage.dispose();
};

export default mount;
