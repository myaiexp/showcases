// A media-player control bar: each button's tip appears and disappears at its own speed
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const CONTROLS = [
  { icon: '▶', tip: 'Instant in, instant out', duration: 0 },
  { icon: '⏭', tip: 'The standard fade', duration: [300, 250] },
  { icon: '🔊', tip: 'A slow, one-second fade', duration: 1000 },
  { icon: '⛶', tip: 'Slow in, gone at once', duration: [500, 0] },
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Hover each button, and move away to watch it leave.' });

  const screen = document.createElement('div');
  screen.className = 'screen';
  const controls = document.createElement('div');
  controls.className = 'controls';
  stage.root.append(screen, controls);

  const buttons = CONTROLS.map((c) => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = c.icon;
    controls.append(b);
    stage.own(
      tippy(b, {
        content: c.tip,
        duration: c.duration as number | [number, number],
        placement: 'top',
        appendTo: stage.root,
      }),
    );
    return b;
  });

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const b of buttons) {
        await stage.ghost.hover(b, 450);
        await wait(1400);
        stage.ghost.leave();
        await wait(1100);
      }
    });
  }

  return stage.dispose;
};

export default mount;
