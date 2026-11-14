// Viewport-wide resize() inside an iframe whose width is animated from the outside
import { animate, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { motionFrame } from '../../shared/frame.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const PAGE_CSS = `
  body { padding: 0; }
  nav { display: flex; align-items: center; gap: 12px; padding: 8px 12px; background: #1e1e2a; border-bottom: 1px solid #333; font-size: 13px; }
  nav b { margin-right: auto; }
  nav .links a { margin-left: 12px; color: #c8c8d0; }
  nav .burger { display: none; font-size: 18px; line-height: 1; }
  nav.small .links { display: none; }
  nav.small .burger { display: block; }
  .size { margin: 10px 12px; font: 12px var(--font-mono, monospace); color: #8aa4ff; }
  .grid { display: grid; gap: 8px; padding: 0 12px 12px; }
  .grid i { height: 38px; border-radius: 6px; background: linear-gradient(135deg, #3a2a6a, #c0507a); }
`;

const mount: Mount = async (el, { preview, signal }) => {
  el.innerHTML = `<div class="slot${preview ? '' : ' full'}"><div class="holder"></div></div>`;
  const holder = el.querySelector<HTMLElement>('.holder')!;

  let frame;
  try {
    frame = await motionFrame(holder, { css: PAGE_CSS, signal });
  } catch (err) {
    if (signal.aborted) return () => undefined;
    throw err;
  }
  const { Motion, doc } = frame;
  doc.body.innerHTML = `<nav><b>Shop</b><span class="links"><a>New</a><a>Sale</a><a>About</a></span><span class="burger">&#9776;</span></nav><div class="size"></div><div class="grid"></div>`;
  const nav = doc.querySelector<HTMLElement>('nav')!;
  const size = doc.querySelector<HTMLElement>('.size')!;
  const grid = doc.querySelector<HTMLElement>('.grid')!;
  for (let i = 0; i < 12; i++) grid.append(doc.createElement('i'));

  // No target: resize() watches the viewport. This is the iframe's own Motion, so "viewport" is the frame.
  const apply = ({ width, height }: { width: number; height: number }): void => {
    Motion.frame.render(() => {
      const columns = Math.max(1, Math.floor(width / 90));
      grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
      nav.classList.toggle('small', width < 300);
      size.textContent = `viewport ${Math.round(width)} x ${Math.round(height)}, ${columns} column${columns > 1 ? 's' : ''}`;
    });
  };
  apply({ width: frame.win.innerWidth, height: frame.win.innerHeight }); // the window version has no first call of its own
  const stop = Motion.resize(apply);

  let p: ReturnType<typeof panel> | undefined;
  const scope = scopeMotion(el, ({ bind }) => {
    const max = (): number => (preview ? 240 : Math.min(560, el.clientWidth - 8));
    if (!preview) holder.style.width = '360px';
    const to = bind((w: number) => animate(holder, { width: w }, { type: 'spring', bounce: 0.15, visualDuration: 0.7 }));
    if (preview) {
      animate(holder, { width: [240, 110] }, { duration: 3.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' });
    } else {
      hint(el, 'Change the page width. Under 300px the menu folds into a burger, and the grid gains or loses a column about every 90px.');
      p = panel(el);
      p.slider('width', { min: 140, max: 560, step: 10, value: 360 }, (v) => to(Math.min(v, max())));
      p.button('Phone', () => to(180));
      p.button('Tablet', () => to(360));
      p.button('Desktop', () => to(max()));
    }
  });
  return () => { scope.cancel(); stop(); p?.dispose(); frame.iframe.remove(); };
};

export default mount;
