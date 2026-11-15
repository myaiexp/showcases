// Rows shifted by their number
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 8 / 100% _1px / #f5f5f0;
  background: #000;
  translate: ${v};
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`@y(*5%)`));
  stage.variants(doodle, [
    { label: '@y(*5%)', code: code(`@y(*5%)`) },
    { label: '@y(*-5%)', code: code(`@y(*-5%)`) },
    { label: '@y(*5%) @x(*5%)', code: code(`@y(*5%) @x(*5%)`) },
  ]);
  stage.say('translate: @y(*5%) pushes each row 5% further');
  return () => stage.dispose();
};

export default mount;
