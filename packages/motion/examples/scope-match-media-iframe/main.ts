// scopeMotion matchMedia inside an iframe: named conditions and a shorthand string re-run setup as the frame's width changes
import { animate, scopeMotion, toMediaQuery } from 'motion';
import type { Mount } from '@/types.ts';
import { motionFrame } from '../../shared/frame.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

// This CSS styles the iframe's own page. Its width is what the media queries read.
const PAGE_CSS = `
  body { padding: 10px; overflow: hidden; }
  header { display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-radius: 8px; background: var(--bg-raised); border: 1px solid var(--border); }
  nav { display: none; gap: 12px; }
  nav a { font-size: 12px; color: var(--fg-2); }
  .burger { display: none; }
  [data-layout='desktop'] nav { display: flex; }
  [data-layout='mobile'] .burger { display: block; }
  .hero { margin-top: 10px; height: 64px; border-radius: 8px; background: linear-gradient(135deg, #3a6fd8, #7cf08a); display: grid; place-items: center; font-weight: 600; font-size: 13px; color: #fff; }
  .info { margin-top: 8px; font: 11px/1.4 var(--font-mono, monospace); color: var(--fg-3); }
`;

type Mode = 'named conditions' | 'shorthand string';

const mount: Mount = async (el, { preview, signal }) => {
  const host = document.createElement('div');
  host.className = 'host';
  host.style.height = preview ? '200px' : '260px';
  el.append(host);
  const BREAK = preview ? 210 : 560;

  let frame;
  try {
    frame = await motionFrame(host, { css: PAGE_CSS, signal });
  } catch (err) {
    if (signal.aborted) return () => undefined;
    throw err;
  }
  const { Motion, doc } = frame;
  doc.body.innerHTML = `
    <div class="app">
      <header><b>Acme</b><nav><a>Shop</a><a>Blog</a><a>About</a><a>Cart</a></nav><button class="burger">Menu</button></header>
      <div class="hero"><span class="where">no layout yet</span></div>
      <div class="info"></div>
    </div>`;
  const app = doc.querySelector<HTMLElement>('.app')!;
  const where = doc.querySelector<HTMLElement>('.where')!;
  const info = doc.querySelector<HTMLElement>('.info')!;

  const SHORT = `>=${BREAK} !touch`;
  let mode: Mode = 'named conditions';
  let scope: ReturnType<typeof Motion.scopeMotion>;
  let runs = 0;
  let p: ReturnType<typeof panel> | undefined;
  let showQuery: ((v: string | number) => void) | undefined;
  let showWidth: ((v: string | number) => void) | undefined;

  // Setup runs while a condition matches and runs again whenever they change, after the scope has
  // stopped and restored every inline style the old run animated.
  const build = (): void => {
    const options = mode === 'named conditions'
      ? { matchMedia: { desktop: `>=${BREAK}`, mobile: `<${BREAK}`, reduce: 'reducedMotion' } }
      : { matchMedia: SHORT };
    scope = Motion.scopeMotion(app, (s) => {
      runs++;
      const named = mode === 'named conditions';
      const desktop = named ? s.media.desktop : true;
      app.dataset.layout = desktop ? 'desktop' : 'mobile';
      where.textContent = `${desktop ? 'desktop' : 'mobile'} layout (setup run ${runs})`;
      info.textContent = named ? `media = ${JSON.stringify(s.media)}` : `media.matches = ${String(s.media.matches)}`;
      const still = named && s.media.reduce;
      if (!still) {
        if (desktop) Motion.animate('nav a', { opacity: [0, 1], y: [-10, 0] }, { delay: Motion.stagger(0.07), duration: 0.3 });
        else Motion.animate('.burger', { scale: [0.5, 1] }, { type: 'spring', bounce: 0.5, visualDuration: 0.4 });
        Motion.animate('.hero', { scale: [0.94, 1] }, { type: 'spring', bounce: 0.4, visualDuration: 0.4 });
      }
      return () => {
        delete app.dataset.layout;
        if (!named) {
          // Shorthand mode: below the breakpoint no setup runs, so do not leave the last layout's text behind.
          where.textContent = 'condition not met: setup stopped';
          info.textContent = 'media.matches = false';
        }
      };
    }, options);
    if (!preview) {
      showQuery?.(toMediaQuery(mode === 'named conditions' ? `>=${BREAK}` : SHORT));
    }
  };

  const outer = scopeMotion(el, () => {
    build();
    if (preview) {
      // The card narrows and widens the frame by itself.
      animate(host, { width: [150, 260] }, { duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' });
    } else {
      host.style.width = '640px';
      host.style.maxWidth = '100%';
      hint(el, `Drag the frame width across ${BREAK}px. The scope's setup re-runs with the right layout; in shorthand mode (>=${BREAK} !touch) nothing runs below the breakpoint.`);
      p = panel(el);
      p.slider('frame width (px)', { min: 300, max: 700, step: 1, value: 640 }, (v) => {
        host.style.width = `${v}px`;
        showWidth?.(`${v}px`);
      });
      p.select('conditions', ['named conditions', 'shorthand string'] as const, mode, (v) => {
        scope.cancel();
        mode = v;
        build();
      });
      showWidth = p.readout('width', '640px');
      showQuery = p.readout('toMediaQuery', '');
      showQuery(toMediaQuery(`>=${BREAK}`));
    }
  });

  return () => {
    outer.cancel();
    scope.cancel();
    frame.iframe.remove();
    p?.dispose();
  };
};

export default mount;
