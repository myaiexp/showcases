// Depth: a chain of nested cells
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 1x1x${v} / 100% / #14141a;
  @size: 92%;
  @place: center;
  border: 1px solid hsl(@z(*20), 80%, 65%);
  rotate: @z(*.5deg);
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`12`));
  stage.variants(doodle, [
    { label: '12 deep', code: code(`12`) },
    { label: '24 deep', code: code(`24`) },
    { label: '40 deep', code: code(`40`) },
  ]);
  stage.say('1x1xN: each cell holds the next, @z numbers the levels');
  return () => stage.dispose();
};

export default mount;
