// Easing with an expression in t
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 24x1 / 100% auto / #f5f5f0;
  @size: 6px;
  border-radius: 50%;
  background: #000;
  @place: safe @iI(*100%) @iI(${v}, *100%);
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`t^2`), { frame: 'wide' });
  stage.variants(doodle, [
    { label: 't^2', code: code(`t^2`) },
    { label: 't^3', code: code(`t^3`) },
    { label: 'sqrt(t)', code: code(`sqrt(t)`) },
    { label: 'linear', code: code(`linear`) },
  ]);
  stage.say('x is @iI(*100%), y is @iI(t^2, *100%)');
  return () => stage.dispose();
};

export default mount;
