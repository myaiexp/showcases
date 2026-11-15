// Column ratio with easing
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = (v: string): string => `
  @grid: 12x1 / 100% auto / #f5f5f0;
  @size: @Xx(${v}, *100%);
  @place: center;
  background: #000;
  opacity: @xX;
  border-radius: 50%;
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code(`ease-out`), { frame: 'wide' });
  stage.variants(doodle, [
    { label: 'ease-out', code: code(`ease-out`) },
    { label: 'ease-in', code: code(`ease-in`) },
    { label: 'linear', code: code(`linear`) },
    { label: 't^3', code: code(`t^3`) },
  ]);
  stage.say('@Xx(ease-out, *100%) sizes the circles');
  return () => stage.dispose();
};

export default mount;
