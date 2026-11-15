// Repeating a shadow with @m
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 5 / 100% _1px / #f5f5f0;
  background: #000;
  margin: 20%;
  box-shadow: @m${v}(
    @n(*2px) @n(*2px) 0 #e6437d
  );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`5`));
  stage.variants(doodle, [
    { label: '@m5', code: code(`5`) },
    { label: '@m3', code: code(`3`) },
    { label: '@m8', code: code(`8`) },
  ]);
  stage.say('Five shadows, each shifted by @n(*2px)');
  return () => stage.dispose();
};

export default mount;
