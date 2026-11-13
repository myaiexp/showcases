// gsap.matchMedia() in an iframe whose width flips across a breakpoint on a timer
import type { Mount } from '@/types.ts';
import { gsapFrame } from '../../shared/frame.ts';
import './style.css';

const PAGE_CSS = `
body { padding: 12px; text-align: center; }
.stage { position: relative; height: 90px; display: grid; place-items: center; }
.box { width: 56px; height: 56px; border-radius: 10px; background: var(--accent); }
.stats { font: 12px/1.6 var(--font-mono, monospace); color: var(--fg-1); }
.stats b { color: var(--green); }
.mode { font: 600 13px system-ui, sans-serif; margin-top: 4px; }
`;

const mount: Mount = async (el, { preview, signal }) => {
  const frame = await gsapFrame(el, { plugins: [], css: PAGE_CSS, signal });
  const { gsap, doc, iframe } = frame;
  iframe.classList.toggle('preview', preview);
  doc.body.innerHTML = `
    <div class="stage"><div class="box"></div></div>
    <div class="mode"></div>
    <div class="stats"></div>`;
  const box = doc.querySelector<HTMLElement>('.box') as HTMLElement;
  const mode = doc.querySelector<HTMLElement>('.mode') as HTMLElement;
  const stats = doc.querySelector<HTMLElement>('.stats') as HTMLElement;

  const BP = preview ? 200 : 400; // the breakpoint in px, in the iframe's own width
  const WIDE = preview ? 250 : 520;
  const NARROW = preview ? 150 : 280;
  let runs = 0;
  let cleanups = 0;
  const report = (text: string): void => {
    mode.textContent = text;
    stats.innerHTML = `handler runs <b>${runs}</b> &middot; cleanups <b>${cleanups}</b><br>width ${Math.round(doc.documentElement.clientWidth)}px, breakpoint ${BP}px`;
  };

  const mm = gsap.matchMedia();
  // Conditions object: the handler runs whenever ANY of them toggles, with fresh booleans.
  mm.add(
    { isWide: `(min-width: ${BP}px)`, isNarrow: `(max-width: ${BP - 1}px)` },
    (context) => {
      const { isWide } = context.conditions as { isWide: boolean };
      runs++;
      report(isWide ? 'wide: the box spins' : 'narrow: the box bobs');
      // Everything created here is reverted automatically when the condition changes.
      if (isWide) gsap.to(box, { rotation: 360, duration: 1.4, ease: 'power1.inOut', repeat: -1, repeatDelay: 0.3 });
      else gsap.to(box, { y: -14, duration: 0.5, ease: 'sine.inOut', repeat: -1, yoyo: true });
      return () => {
        cleanups++;
        report('reverting...');
      };
    },
  );

  // Resize the iframe: its media queries see the new width, the page's don't.
  let wide = true;
  const setWidth = (w: number): void => {
    iframe.style.width = `${w}px`;
  };
  setWidth(WIDE);
  const flip = (): void => {
    wide = !wide;
    setWidth(wide ? WIDE : NARROW);
  };
  const timer = window.setInterval(flip, 3500);

  let controls: HTMLElement | undefined;
  if (!preview) {
    controls = document.createElement('div');
    controls.className = 'bar';
    const mk = (label: string, fn: () => void): void => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = label;
      b.addEventListener('click', fn);
      controls?.append(b);
    };
    mk('Flip width now', flip);
    mk('gsap.matchMediaRefresh()', () => {
      gsap.matchMediaRefresh();
    });
    el.append(controls);
  }

  return () => {
    window.clearInterval(timer);
    mm.revert();
    controls?.remove();
    iframe.remove();
  };
};

export default mount;
