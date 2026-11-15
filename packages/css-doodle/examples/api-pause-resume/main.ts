// pause() and resume() a doodle's CSS animations
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  // Every cell runs the same spin, delayed by its index.
  const doodle = stage.doodle(`
    @grid: 7 / 100% / #111 _4px;
    background: hsl(@i(*7) 70% 60%);
    border-radius: 0 50%;
    animation: spin 2s ease-in-out infinite;
    animation-delay: @i(*-.05s);
    @keyframes spin {
      to { rotate: 1turn; }
    }
  `);

  // While paused the element carries the cssd-paused attribute.
  const toggle = (): void => {
    const paused = doodle.hasAttribute('cssd-paused');
    if (paused) doodle.resume();
    else doodle.pause();
    if (b) b.textContent = paused ? 'Pause' : 'Resume';
    stage.say(paused ? 'resume(): running' : 'pause(): cssd-paused is set', paused ? 'ok' : 'warn');
  };
  const b = stage.bar ? button(stage.bar, 'Pause', toggle) : null;
  if (!stage.bar) stage.every(1800, toggle);
  return () => stage.dispose();
};

export default mount;
