// Dashboard widgets that shuffle, with one widget given its own layout duration
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import { viewStage } from '../../shared/view.ts';

const CSS = `
.board{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.widget{height:68px;border-radius:12px;padding:10px;display:flex;flex-direction:column;justify-content:space-between;background:var(--bg-surface);border:1px solid var(--border);font-size:11px;color:var(--fg-3)}
.widget b{font-size:20px;color:var(--fg-1)}
.featured{background:var(--accent);border-color:var(--accent);color:var(--accent-text)}
.featured b{color:var(--accent-text)}
.go{display:block;margin:10px auto 0}
`;
const WIDGETS = [['Revenue', '$12.4k', true], ['Visitors', '3,210', false], ['Orders', '148', false], ['Refunds', '2', false]] as const;

const mount: Mount = async (el, { preview, signal }) => {
  const stage = await viewStage(el, { preview, signal, css: CSS });
  const { animateView } = stage.Motion;
  stage.app.innerHTML = `<div class="board">${WIDGETS.map(([n, v, f]) => `<div class="widget${f ? ' featured' : ''}"><span>${n}</span><b>${v}</b></div>`).join('')}</div><button class="go">Rearrange</button>`;
  const board = stage.app.querySelector('.board') as HTMLElement;
  let featured = 1.4;

  const rotate = (): void => {
    animateView(() => board.append(board.firstElementChild!), { duration: 0.4, ease: 'easeInOut' })
      // The others use animateView's default duration, 0.4s.
      .add('.widget:not(.featured)')
      // layout() sets the transition of this one element's move only.
      .add('.featured')
      .layout({ duration: featured, ease: 'easeInOut' });
  };
  stage.app.querySelector('.go')?.addEventListener('click', rotate);

  if (preview) {
    stage.every(rotate, 2.6, 0.8);
    return () => stage.dispose();
  }
  const p = panel(el);
  p.slider('Revenue duration (s)', { min: 0.2, max: 3, step: 0.1, value: featured }, (v) => { featured = v; });
  hint(el, 'Press Rearrange. Three widgets move in 0.4s; the highlighted Revenue widget takes the duration on the slider, because .layout() overrides the default for it alone.');
  return () => {
    stage.dispose();
    p.dispose();
  };
};

export default mount;
