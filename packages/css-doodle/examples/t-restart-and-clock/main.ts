// @t restarts, @T keeps going
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';

const hand = (fn: string): string => `
  @grid: 1 / 100% / #f5f5f0;
  @size: 92%;
  margin: auto;
  border: 1px solid #000;
  border-radius: 50%;
  background: linear-gradient(#e6437d, #e6437d) 50% 0 / 3% 50% no-repeat;
  rotate: ${fn};
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const a = stage.doodle(hand('@t(*.12deg, %360deg)'), { label: '@t' });
  const b = stage.doodle(hand('@T(*.12deg, %360deg)'), { label: '@T', editor: true });
  stage.every(3000, () => {
    a.update();
    b.update();
  });
  if (stage.bar) {
    let paused = false;
    const toggle = button(stage.bar, 'Pause', () => {
      paused = !paused;
      for (const d of [a, b]) paused ? d.pause() : d.resume();
      toggle.textContent = paused ? 'Resume' : 'Pause';
    });
  }
  stage.say('Every 3 seconds update() runs: only @t starts over');
  return () => stage.dispose();
};

export default mount;
