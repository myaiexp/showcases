// @P never picks the same value twice in a row
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const col = (fn: string): string => `
  @grid: 1x12 / 100% / #f5f5f0;
  background: ${fn}(#000, #e6437d, #ebbf4d);
  transition: .5s;
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const a = stage.doodle(col('@p'), { label: '@p' });
  const b = stage.doodle(col('@P'), { label: '@P', editor: true });
  stage.reroll(b);
  stage.every(2400, () => a.update());
  if (stage.bar) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn';
    btn.textContent = 'New seed (@p)';
    btn.addEventListener('click', () => a.update());
    stage.bar.append(btn);
  }
  stage.say('@P never gives the colour of the cell above');
  return () => stage.dispose();
};

export default mount;
