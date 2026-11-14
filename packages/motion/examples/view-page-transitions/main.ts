// Page transitions between two screens: wipe, slide up, fade out then in, crossfade
import type { ViewTransitionBuilder } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import { viewStage } from '../../shared/view.ts';

const CSS = `
.page{border-radius:14px;padding:14px;height:min(170px,100vh - 56px);display:flex;flex-direction:column;justify-content:flex-end;gap:4px;color:#fff}
.page h2{margin:0;font-size:20px}
.page p{margin:0;font-size:12px;opacity:.85}
.pager button{color:var(--fg-1)}
.pager{display:flex;justify-content:space-between;align-items:center;margin-top:8px;font-size:12px;color:var(--fg-3)}
`;

const PAGES = [
  ['Mountains', 'Day one on the ridge', 'linear-gradient(150deg,#134e5e,#71b280)'],
  ['Harbour', 'Day two by the water', 'linear-gradient(150deg,#355c7d,#c06c84)'],
] as const;

// Each style is the docs' recipe: it adds animations to the builder for the page layers.
const STYLES: Record<string, (b: ViewTransitionBuilder) => ViewTransitionBuilder> = {
  'Wipe left': (b) => b.new({ clipPath: ['inset(0% 0% 0% 100%)', 'inset(0% 0% 0% 0%)'] }),
  'Slide up': (b) => b.old({ opacity: 0, transform: 'translateY(-50px)' }).new({ opacity: 1, transform: ['translateY(50px)', 'none'] }),
  'Fade out, then in': (b) => b.old({ opacity: 0 }, { duration: 0.2 }).new({ opacity: 1 }, { delay: 0.2 }),
  Crossfade: (b) => b.old({ opacity: 0 }).new({ opacity: 1 }),
};

const mount: Mount = async (el, { preview, signal }) => {
  const stage = await viewStage(el, { preview, signal, css: CSS });
  const { animateView } = stage.Motion;
  stage.app.innerHTML = `<div class="page"></div><div class="pager"><span class="count"></span><button>Next page</button></div>`;
  const page = stage.app.querySelector('.page') as HTMLElement;
  const count = stage.app.querySelector('.count') as HTMLElement;
  let index = 0;
  let style = 'Wipe left';

  const render = (): void => {
    const [title, line, bg] = PAGES[index]!;
    page.style.background = bg;
    page.replaceChildren();
    const h = stage.doc.createElement('h2');
    h.textContent = title;
    const p = stage.doc.createElement('p');
    p.textContent = line;
    page.append(h, p);
    count.textContent = `${index + 1} of ${PAGES.length}`;
  };
  render();

  const next = (): void => {
    const update = (): void => {
      index = (index + 1) % PAGES.length;
      render();
    };
    STYLES[style]!(animateView(update, { duration: 0.6, ease: 'easeInOut' }));
  };
  stage.app.querySelector('button')?.addEventListener('click', next);

  if (preview) {
    const names = Object.keys(STYLES);
    let n = 0;
    stage.every(() => {
      style = names[n++ % names.length]!;
      next();
    }, 1.6, 0.8);
    return () => stage.dispose();
  }
  const p = panel(el);
  p.select('Transition', Object.keys(STYLES), style, (v) => { style = v; });
  hint(el, 'Pick a style, then press Next page. Wipe animates only the new layer; Slide up and Fade out then in animate both old and new, the latter with its own timing for each.');
  return () => {
    stage.dispose();
    p.dispose();
  };
};

export default mount;
