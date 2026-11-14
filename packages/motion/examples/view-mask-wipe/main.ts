// A soft-edged mask wipe: registered CSS properties let the view transition animate mask-image
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import { viewStage } from '../../shared/view.ts';

// ::view-transition-new(.wipe) reads --wipe-a and --wipe-b, so animating those two numbers
// moves the soft edge of the mask. The class is put on the layer with .class('wipe').
const PAGE_CSS = `
::view-transition-new(.wipe){mask-image:linear-gradient(90deg,transparent var(--wipe-a),black var(--wipe-b))}
.panel{height:min(180px,100vh - 64px);border-radius:16px;padding:14px;display:flex;flex-direction:column;justify-content:flex-end;color:#fff}
.panel h2{margin:0;font-size:20px}
.panel p{margin:2px 0 0;font-size:12px;opacity:.85}
.panel-wrap{margin-bottom:10px}
.go{display:block;margin:0 auto}
`;
const SCENES = [
  ['Dawn', 'Colour grade: warm', 'linear-gradient(135deg,#f6d365,#fda085 55%,#3a6186)'],
  ['Dusk', 'Colour grade: cool', 'linear-gradient(135deg,#0f2027,#2c5364 50%,#c06c84)'],
] as const;

const mount: Mount = async (el, { preview, signal }) => {
  const stage = await viewStage(el, { preview, signal, css: PAGE_CSS });
  const { animateView } = stage.Motion;
  // Custom properties must be registered (once per document) before they can be animated.
  // The iframe has its own CSS object, so it is registered there.
  const register = (position: string, initialValue: string): void => {
    try {
      (stage.win as unknown as { CSS: typeof CSS }).CSS.registerProperty({ name: `--wipe-${position}`, syntax: '<length-percentage>', inherits: false, initialValue });
    } catch {
      // already registered
    }
  };
  register('a', '-100%');
  register('b', '0%');

  stage.app.innerHTML = '<div class="panel-wrap"></div><button class="go">Next look</button>';
  const wrap = stage.app.querySelector('.panel-wrap') as HTMLElement;
  let index = 0;
  let seconds = 0.9;

  const render = (): void => {
    const [title, line, bg] = SCENES[index]!;
    const panelEl = stage.doc.createElement('div');
    panelEl.className = 'panel';
    panelEl.style.background = bg;
    const h = stage.doc.createElement('h2');
    h.textContent = title;
    const p = stage.doc.createElement('p');
    p.textContent = line;
    panelEl.append(h, p);
    wrap.replaceChildren(panelEl);
  };
  render();

  const next = (): void => {
    animateView(() => {
      index = (index + 1) % SCENES.length;
      render();
    }, { duration: seconds, ease: 'easeInOut' })
      .add('.panel')
      .class('wipe')
      .exit({ opacity: 1 })
      .enter({ '--wipe-a': '100%', '--wipe-b': '200%' });
  };
  stage.app.querySelector('.go')?.addEventListener('click', next);

  if (preview) {
    stage.every(next, 2, 0.8);
    return () => stage.dispose();
  }
  const p = panel(el);
  p.slider('Seconds', { min: 0.3, max: 3, step: 0.1, value: seconds }, (v) => { seconds = v; });
  hint(el, 'Press Next look. mask-image cannot normally be animated; registering --wipe-a and --wipe-b with CSS.registerProperty lets enter() sweep a soft edge across the new photo.');
  return () => {
    stage.dispose();
    p.dispose();
  };
};

export default mount;
