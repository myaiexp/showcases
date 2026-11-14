// An inbox whose rows fade and shrink as they enter at the bottom and leave at the top, via scroll() target + offset
import { animate, scopeMotion, scroll } from 'motion';
import type { Mount } from '@/types.ts';
import { autoScroll } from '../../shared/autoscroll.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const ROWS: Array<[who: string, line: string, hue: number]> = [
  ['Ada', 'Lunch on Thursday?', 20], ['Bo', 'Your parcel is on its way', 200], ['Cleo', 'Photos from the lake', 140],
  ['Dev', 'Build 482 passed', 260], ['Esi', 'New comment on your draft', 330], ['Finn', 'Invoice for October', 50],
  ['Gus', 'Are we still on for 6?', 170], ['Hana', 'Welcome to the team', 300], ['Ivo', 'Security alert: new sign-in', 0],
  ['Jun', 'Tickets for Saturday', 90], ['Kai', 'Re: moving day', 230], ['Lea', 'Reminder: dentist at 9', 350],
];

type Mode = 'Fade in and out' | 'Fade in only (bottom edge)' | 'Fade out only (top edge)';
const MODES = ['Fade in and out', 'Fade in only (bottom edge)', 'Fade out only (top edge)'] as const;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = '<div class="inbox"><div class="scroller"></div></div>';
  el.querySelector('.inbox')!.classList.toggle('full', !preview);
  const scroller = el.querySelector<HTMLElement>('.scroller')!;
  const rows = ROWS.map(([who, line, hue]) => {
    const row = document.createElement('div');
    row.className = 'row';
    const avatar = document.createElement('i');
    avatar.style.background = `hsl(${hue} 60% 55%)`;
    avatar.textContent = who[0] ?? '';
    const text = document.createElement('span');
    const name = document.createElement('b');
    name.textContent = who;
    text.append(name, line);
    row.append(avatar, text);
    scroller.append(row);
    return row;
  });

  let mode: Mode = 'Fade in and out';
  let cancels: VoidFunction[] = [];
  const attach = (): void => {
    cancels.forEach((c) => c());
    cancels = rows.map((row) => {
      row.style.opacity = '';
      // Each row is its own target. Progress 0 is "start end" (the row's top edge meets the panel's
      // bottom edge: it is just about to appear), progress 1 is "end start" (its bottom meets the panel's top: gone).
      if (mode === 'Fade in only (bottom edge)') {
        const a = animate(row, { opacity: [0, 1], scale: [0.8, 1] }, { ease: 'linear' });
        return scroll(a, { container: scroller, target: row, offset: ['start end', 'end end'] });
      }
      if (mode === 'Fade out only (top edge)') {
        const a = animate(row, { opacity: [1, 0], scale: [1, 0.8] }, { ease: 'linear' });
        return scroll(a, { container: scroller, target: row, offset: ['start start', 'end start'] });
      }
      const a = animate(row, { opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8] }, { ease: 'linear', times: [0, 0.25, 0.75, 1] });
      return scroll(a, { container: scroller, target: row, offset: ['start end', 'end start'] });
    });
  };

  const scope = scopeMotion(el, () => {
    attach();
    if (preview) autoScroll(scroller, { duration: 6 });
  });

  const controls = !preview ? panel(el) : undefined;
  controls?.select('effect', MODES, mode, (v) => {
    mode = v;
    scope.run(attach);
  });
  if (!preview) hint(el, 'Scroll the list. Every row has its own scroll() with itself as target; offset decides where along the panel the fade happens. Switch the effect to see the offset change.');

  return () => {
    scope.cancel();
    controls?.dispose();
  };
};

export default mount;
