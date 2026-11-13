// An iframe is resized back and forth; raw resize events pile up while callAfterResize fires once per resize
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { gsapFrame } from '../../shared/frame.ts';
import { h } from '../../shared/ui.ts';
import { callAfterResize } from './callAfterResize.ts';
import './style.css';

const mount: Mount = async (el, { preview, signal }) => {
  const root = h('div', preview ? 'root compact' : 'root', '', el);
  // The iframe is the only thing here that has a window we may resize at will.
  const frame = await gsapFrame(root, {
    plugins: [],
    css: 'body{display:grid;place-items:center;height:100vh;background:linear-gradient(90deg,var(--bg-raised),var(--accent));color:#111;font:600 12px ui-monospace,monospace}',
    signal,
  });
  frame.iframe.classList.add('resizable');
  frame.doc.body.textContent = 'resize me';

  const stats = h('div', 'stats', '', root);
  const mkStat = (label: string, cls: string): { bar: HTMLElement; num: HTMLElement } => {
    const row = h('div', 'statrow', '', stats);
    h('span', 'lab', label, row);
    const track = h('div', 'track', '', row);
    return { bar: h('div', `bar ${cls}`, '', track), num: h('b', 'num', '0', row) };
  };
  const rawStat = mkStat('resize events', 'raw');
  const debStat = mkStat('debounced calls', 'deb');
  const log = h('ol', 'log', '', root);
  if (preview) log.remove();

  let raw = 0;
  let calls = 0;
  const onRaw = (): void => {
    raw++;
    rawStat.num.textContent = String(raw);
    rawStat.bar.style.width = `${Math.min(100, raw * 2)}%`;
  };
  frame.win.addEventListener('resize', onRaw);

  let handler: (() => void) | undefined;
  const ctx = gsap.context(() => {
    handler = callAfterResize(() => {
      calls++;
      debStat.num.textContent = String(calls);
      debStat.bar.style.width = `${Math.min(100, calls * 12)}%`;
      h('li', '', `call ${calls}: iframe is now ${frame.iframe.clientWidth}px wide`, log);
      while (log.children.length > 6) log.firstElementChild?.remove();
    }, 0.3, frame.win);
    // drag-resize stand-in: width glides, rests, glides again (a loop built once)
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(frame.iframe, { width: '55%', duration: 1.6, ease: 'sine.inOut' })
      .to(frame.iframe, { width: '100%', duration: 1.6, ease: 'sine.inOut' }, '+=1.6')
      .to({}, { duration: 1.6 });
  }, el);

  return () => {
    frame.win.removeEventListener('resize', onRaw);
    if (handler) frame.win.removeEventListener('resize', handler);
    ctx.revert();
    frame.iframe.remove();
  };
};

export default mount;
