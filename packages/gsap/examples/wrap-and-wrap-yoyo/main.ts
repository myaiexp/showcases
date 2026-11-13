// Two balls driven past the end of a track: wrap() jumps back, wrapYoyo() reverses; plus colour strips by index
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const COLORS = ['#e5484d', '#30a46c', '#f5d90a'];

const mount: Mount = (el, { preview }) => {
  const labelled = (name: string, call: string): { row: HTMLElement; track: HTMLElement } => {
    const row = document.createElement('div');
    row.className = 'row';
    const caption = document.createElement('div');
    caption.className = 'caption';
    caption.textContent = `${name}  ${call}`;
    const track = document.createElement('div');
    track.className = 'track';
    row.append(caption, track);
    return { row, track };
  };

  const a = labelled('wrap', 'x past the end returns to 0');
  const b = labelled('wrapYoyo', 'x past the end turns around');
  const ballA = document.createElement('div');
  ballA.className = 'ball';
  const ballB = document.createElement('div');
  ballB.className = 'ball b';
  a.track.append(ballA);
  b.track.append(ballB);

  // Colour strips: index i is fed to wrap(array, i) and wrapYoyo(array, i).
  const strip = (pick: (i: number) => string): HTMLElement => {
    const s = document.createElement('div');
    s.className = 'strip';
    for (let i = 0; i < 10; i++) {
      const dot = document.createElement('span');
      dot.style.background = pick(i);
      dot.textContent = String(i);
      s.append(dot);
    }
    return s;
  };
  const wrapColor = gsap.utils.wrap(COLORS);
  const yoyoColor = gsap.utils.wrapYoyo(COLORS);
  el.append(a.row, b.row);
  if (!preview) {
    const cap = document.createElement('div');
    cap.className = 'caption';
    cap.textContent = 'wrap(colors, i) then wrapYoyo(colors, i) for i = 0..9';
    el.append(cap, strip((i) => wrapColor(i) as string), strip((i) => yoyoColor(i) as string));
  }

  const ctx = gsap.context(() => {
    const max = Math.max(60, (a.track.clientWidth || 240) - 28);
    const windowWrap = gsap.utils.wrap(0, max);
    const windowYoyo = gsap.utils.wrapYoyo(0, max);
    const timing = { duration: preview ? 6 : 10, ease: 'none' };
    // Tween far beyond the track; the modifiers fold the value back into 0..max every frame.
    gsap.to(ballA, {
      x: max * 4,
      ...timing,
      repeat: -1,
      modifiers: { x: (x: string) => `${windowWrap(parseFloat(x))}px` },
    });
    gsap.to(ballB, {
      x: max * 4,
      ...timing,
      repeat: -1,
      modifiers: { x: (x: string) => `${windowYoyo(parseFloat(x))}px` },
    });
  }, el);

  return () => ctx.revert();
};

export default mount;
