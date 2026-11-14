// A dark-mode switch: the handle glides via add(), the page recolours in a crossfade
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import { viewStage } from '../../shared/view.ts';

// The theme is a pair of CSS variables on the iframe's <html>, so the whole page recolours.
const CSS = `
html{--page:#f4f1ea;--ink:#1d1b16;--soft:#6d675a;--card:#fff;--track:#cfc8b6}
html[data-theme=dark]{--page:#14161c;--ink:#f1f1f4;--soft:#9aa0ae;--card:#20232c;--track:#3b6fe0}
body{background:var(--page);color:var(--ink)}
.card{background:var(--card);border-radius:14px;padding:14px;box-shadow:0 4px 18px rgba(0,0,0,.15)}
.head{display:flex;align-items:center;justify-content:space-between}
.head b{font-size:15px}
.sub{margin:2px 0 12px;font-size:12px;color:var(--soft)}
.switch{display:flex;justify-content:flex-start;width:54px;height:30px;padding:3px;border:0;border-radius:15px;background:var(--track)}
html[data-theme=dark] .switch{justify-content:flex-end}
.toggle-handle{width:24px;height:24px;border-radius:50%;background:#fff;box-shadow:0 2px 5px rgba(0,0,0,.35)}
.line{height:8px;border-radius:4px;background:var(--track);opacity:.5;margin-top:8px}
`;

const mount: Mount = async (el, { preview, signal }) => {
  const stage = await viewStage(el, { preview, signal, css: CSS });
  const { animateView } = stage.Motion;
  const root = stage.doc.documentElement;
  stage.app.innerHTML = `<div class="card">
    <div class="head"><b>Dark mode</b><button class="switch" aria-label="Dark mode"><i class="toggle-handle"></i></button></div>
    <p class="sub">Easier on the eyes at night</p>
    <div class="line"></div><div class="line" style="width:70%"></div><div class="line" style="width:45%"></div></div>`;
  let spring = true;

  const flip = (): void => {
    const update = (): void => { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; };
    animateView(update, spring ? { type: 'spring', visualDuration: 0.45, bounce: 0.3 } : { duration: 0.4 })
      // Chained on the root first: the whole page crossfades to the new colours.
      .new({ opacity: [0, 1] }, { duration: 0.35 })
      // Then the handle: add() animates its size and position from the old state to the new.
      .add('.toggle-handle');
  };
  stage.app.querySelector('.switch')?.addEventListener('click', flip);

  if (preview) {
    stage.every(flip, 1.8, 0.9);
    return () => stage.dispose();
  }
  const p = panel(el);
  p.toggle('Spring', true, (v) => { spring = v; });
  hint(el, 'Flip the switch. The handle is targeted with .add(".toggle-handle"), so it glides; the page colours crossfade through a root .new() animation.');
  return () => {
    stage.dispose();
    p.dispose();
  };
};

export default mount;
