// A prefers-reduced-motion condition plus a UI toggle: matchMedia picks the animation, matchMediaRefresh re-runs it
import type { Mount } from '@/types.ts';
import { gsapFrame } from '../../shared/frame.ts';
import './style.css';

// matchMediaRefresh() reverts every matchMedia instance of the GSAP it is called on, so the
// example runs in an iframe's own copy of GSAP and leaves the gallery's alone.
const PAGE_CSS = `
body { padding: 14px; text-align: center; }
.stage { height: 110px; display: grid; place-items: center; }
.box { width: 76px; height: 76px; border-radius: 14px; background: linear-gradient(135deg, var(--green), var(--cyan)); }
.mode { font: 600 13px system-ui, sans-serif; color: var(--fg-1); }
.sub { font: 12px var(--font-mono, monospace); color: var(--fg-2); margin: 4px 0 8px; }
label { font: 13px system-ui, sans-serif; color: var(--fg-1); cursor: pointer; }
`;

const mount: Mount = async (el, { preview, signal }) => {
  const frame = await gsapFrame(el, { plugins: [], css: PAGE_CSS, signal });
  const { gsap, doc, iframe } = frame;
  iframe.classList.toggle('preview', preview);
  doc.body.innerHTML = `
    <div class="stage"><div class="box"></div></div>
    <div class="mode"></div>
    <div class="sub"></div>
    <label><input type="checkbox" id="toggle"> Reduced animation please</label>`;
  const box = doc.querySelector<HTMLElement>('.box') as HTMLElement;
  const mode = doc.querySelector<HTMLElement>('.mode') as HTMLElement;
  const sub = doc.querySelector<HTMLElement>('.sub') as HTMLElement;
  const toggle = doc.querySelector<HTMLInputElement>('#toggle') as HTMLInputElement;

  // Start the toggle from the operating-system preference, like the docs' checkbox demo.
  toggle.checked = frame.win.matchMedia('(prefers-reduced-motion: reduce)').matches;
  toggle.addEventListener('change', () => gsap.matchMediaRefresh()); // revert, then run what matches

  const mm = gsap.matchMedia();
  mm.add(
    { reduceMotion: '(prefers-reduced-motion: reduce)', noPreference: '(prefers-reduced-motion: no-preference)' },
    (context) => {
      const { reduceMotion } = context.conditions as { reduceMotion: boolean };
      const reduced = reduceMotion || toggle.checked;
      sub.textContent = `OS reduce: ${reduceMotion}  toggle: ${toggle.checked}`;
      if (reduced) {
        mode.textContent = 'reduced: a gentle opacity pulse only';
        gsap.from(box, { opacity: 0.15, duration: 1.6, ease: 'sine.inOut', repeat: -1, yoyo: true });
      } else {
        mode.textContent = 'full motion: spin, scale and overshoot';
        gsap.from(box, { rotation: 360, scale: 1.5, duration: 2.4, ease: 'back.inOut', repeat: -1, yoyo: true });
      }
    },
  );

  // A card has no pointer input, so the toggle flips itself on a timer.
  const timer = preview
    ? window.setInterval(() => {
        toggle.checked = !toggle.checked;
        gsap.matchMediaRefresh();
      }, 3600)
    : 0;

  return () => {
    window.clearInterval(timer);
    mm.revert();
    iframe.remove();
  };
};

export default mount;
