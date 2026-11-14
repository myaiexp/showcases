// A sticky note moving around a board, its label always on the roomiest side
import tippy, { sticky } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 320, hint: 'Drag the note around the board.' });

  const note = document.createElement('div');
  note.className = 'note';
  note.textContent = 'Call Sam';
  const where = document.createElement('code');
  where.className = 'where';
  stage.root.append(note, where);

  const NOTE = { w: 76, h: 56 };
  const place = (x: number, y: number): void => {
    note.style.transform = `translate(${x}px, ${y}px)`;
  };

  const tip = stage.own(
    tippy(note, {
      content: 'Due today',
      trigger: 'manual',
      showOnCreate: true,
      hideOnClick: false,
      // 'auto' chooses the side with the most space. The note moves, so the tip must keep up.
      placement: 'auto',
      sticky: true,
      plugins: [sticky],
      appendTo: stage.root,
    }),
  );

  // Report which side the tip ended up on.
  stage.every(120, () => {
    const side = tip.popper.firstElementChild?.getAttribute('data-placement');
    where.textContent = side ? `tip is on the ${side.split('-')[0]}` : '';
  });

  let wandering = true;
  const t0 = performance.now();
  stage.every(16, () => {
    if (!wandering) return;
    const t = (performance.now() - t0) / 1000;
    const w = stage.root.clientWidth - NOTE.w;
    const h = stage.root.clientHeight - NOTE.h;
    place(w * (0.5 + 0.5 * Math.sin(t * 0.55)), h * (0.5 + 0.5 * Math.sin(t * 0.83 + 1)));
  });

  if (!stage.preview) {
    note.addEventListener('pointerdown', (e) => {
      wandering = false;
      note.setPointerCapture(e.pointerId);
      note.classList.add('held');
    });
    note.addEventListener('pointermove', (e) => {
      if (!note.hasPointerCapture(e.pointerId)) return;
      const r = stage.root.getBoundingClientRect();
      const x = Math.max(0, Math.min(r.width - NOTE.w, e.clientX - r.left - NOTE.w / 2));
      const y = Math.max(0, Math.min(r.height - NOTE.h, e.clientY - r.top - NOTE.h / 2));
      place(x, y);
    });
    note.addEventListener('pointerup', () => note.classList.remove('held'));
  }

  return stage.dispose;
};

export default mount;
