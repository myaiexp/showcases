// Switching between two app screens with a crossfade on the page's new layer
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import { viewStage } from '../../shared/view.ts';

const CSS = `
.nav{display:flex;gap:6px;margin-bottom:10px}
.nav button[aria-current=true]{background:var(--accent);border-color:var(--accent);color:var(--accent-text)}
.screen{border:1px solid var(--border);border-radius:12px;padding:12px;background:var(--bg-surface);height:140px;box-sizing:border-box;overflow:hidden}
.screen h2{margin:0 0 8px;font-size:15px}
.row{display:flex;align-items:center;gap:8px;padding:5px 0;font-size:12px;color:var(--fg-2)}
.dot{width:22px;height:22px;border-radius:50%;flex:none}
.cal{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}
.cal i{height:20px;border-radius:5px;background:var(--bg-raised)}
.cal i.on{background:var(--accent)}
`;

const SCREENS = {
  Inbox: `<h2>Inbox</h2>
    <div class="row"><i class="dot" style="background:#7c5cff"></i>Design review moved to 3pm</div>
    <div class="row"><i class="dot" style="background:#2fc4b2"></i>Your invoice is ready</div>
    <div class="row"><i class="dot" style="background:#ff7a59"></i>New comment on Launch plan</div>`,
  Calendar: `<h2>This month</h2>
    <div class="cal">${Array.from({ length: 28 }, (_, i) => `<i${[3, 4, 10, 17, 18, 24].includes(i) ? ' class="on"' : ''}></i>`).join('')}</div>`,
} as const;
type Screen = keyof typeof SCREENS;

const mount: Mount = async (el, { preview, signal }) => {
  const stage = await viewStage(el, { preview, signal, css: CSS });
  const { animateView } = stage.Motion;
  stage.app.innerHTML = `<div class="nav"><button data-s="Inbox">Inbox</button><button data-s="Calendar">Calendar</button></div><div class="screen"></div>`;
  const nav = [...stage.app.querySelectorAll('button')];
  const screen = stage.app.querySelector('.screen') as HTMLElement;
  let seconds = 0.5;
  let current: Screen = 'Calendar';

  const show = (s: Screen): void => {
    current = s;
    screen.innerHTML = SCREENS[s];
    nav.forEach((b) => b.setAttribute('aria-current', String(b.dataset.s === s)));
  };
  show('Inbox');
  const go = (s: Screen): void => {
    if (s === current) return;
    // By default nothing animates. Giving the new layer an opacity animation is the crossfade.
    animateView(() => show(s)).new({ opacity: [0, 1] }, { duration: seconds });
  };
  nav.forEach((b) => b.addEventListener('click', () => go(b.dataset.s as Screen)));

  if (preview) {
    stage.every(() => go(current === 'Inbox' ? 'Calendar' : 'Inbox'), 1.6, 0.8);
    return () => stage.dispose();
  }
  const p = panel(el);
  p.slider('Fade seconds', { min: 0.1, max: 2, step: 0.1, value: seconds }, (v) => { seconds = v; });
  hint(el, 'Switch screens. The code only swaps the markup; the crossfade is one line, .new({ opacity: [0, 1] }). Slow it down to watch the two screens overlap.');
  return () => {
    stage.dispose();
    p.dispose();
  };
};

export default mount;
