// Fading in from the border with @db
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 13 / 100% _1px / #f5f5f0;
  background: #000;
  opacity: @db(/${v});
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`6`));
  stage.variants(doodle, [
    { label: '@db(/6)', code: code(`6`) },
    { label: '@db(/3)', code: code(`3`) },
    { label: '@db(/12)', code: code(`12`) },
  ]);
  stage.say('Border cells are invisible, the middle is solid');
  return () => stage.dispose();
};

export default mount;
