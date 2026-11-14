// BeforeUpdate, render and update fire in that order around update()
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const log = document.createElement('ol');
  log.className = 'cd-readout';
  log.style.cssText = `margin: 0; padding-left: 20px; min-width: ${ctx.preview ? 70 : 220}px; align-self: center`;

  const doodle = stage.doodle(`
    @grid: 6 / 100% / #222 _2px;
    background: @p(#06d6a0, #118ab2, #ef476f);
    border-radius: @p(0, 50%);
  `);
  stage.root.append(log);

  const t0 = performance.now();
  const add = (name: string): void => {
    const li = document.createElement('li');
    li.textContent = ctx.preview ? name : `${name}  +${Math.round(performance.now() - t0)} ms  seed ${doodle.seed}`;
    log.append(li);
    while (log.childElementCount > (ctx.preview ? 6 : 12)) log.firstElementChild!.remove();
  };
  // The first render dispatches only render; each update() adds beforeUpdate first
  // (synchronously, old seed still readable) and update last.
  for (const name of ['beforeUpdate', 'render', 'update']) doodle.addEventListener(name, () => add(name));

  if (stage.bar) button(stage.bar, 'update()', () => doodle.update());
  else stage.every(2000, () => doodle.update());
  return () => stage.dispose();
};

export default mount;
