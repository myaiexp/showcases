// Search results that pop in one after another using enter() with a stagger delay
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import { viewStage } from '../../shared/view.ts';

const CSS = `
.search{width:100%;padding:7px 12px;border-radius:999px;border:1px solid var(--border);background:var(--bg-raised);color:var(--fg-1);font:inherit;margin-bottom:8px}
.results{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:6px;min-height:130px;align-content:start}
.result{padding:8px 10px;border-radius:10px;background:var(--bg-surface);border:1px solid var(--border);font-size:12px;display:flex;gap:6px;align-items:center}
.result i{width:8px;height:8px;border-radius:50%;background:var(--accent);flex:none}
.empty{grid-column:1/-1;color:var(--fg-3);font-size:12px;padding:8px}
`;

const CITIES = ['Amsterdam', 'Athens', 'Barcelona', 'Berlin', 'Bergen', 'Lisbon', 'Madrid', 'Malmo', 'Oslo', 'Porto', 'Prague', 'Vienna'];

const mount: Mount = async (el, { preview, signal }) => {
  const stage = await viewStage(el, { preview, signal, css: CSS });
  const { animateView, stagger } = stage.Motion;
  stage.app.innerHTML = '<input class="search" placeholder="Search cities" aria-label="Search cities"><ul class="results"></ul>';
  const input = stage.app.querySelector('input') as HTMLInputElement;
  const list = stage.app.querySelector('.results') as HTMLElement;
  let gap = 0.05;
  const max = preview ? 6 : 12;

  const render = (query: string): void => {
    const hits = CITIES.filter((c) => c.toLowerCase().includes(query.toLowerCase())).slice(0, max);
    list.replaceChildren();
    for (const c of hits) {
      const li = stage.doc.createElement('li');
      li.className = 'result';
      const dot = stage.doc.createElement('i');
      li.append(dot, c);
      list.append(li);
    }
    if (!hits.length) {
      const none = stage.doc.createElement('li');
      none.className = 'empty';
      none.textContent = 'No matches';
      list.append(none);
    }
  };
  render('');

  const search = (query: string): void => {
    // add() takes a selector, so every result gets its own layer; the stagger offsets them.
    animateView(() => render(query), { duration: 0.3 })
      .add('.result')
      .exit({ opacity: 0 }, { duration: 0.12 })
      .enter({ opacity: [0, 1], scale: [0.6, 1] }, { delay: stagger(gap) });
  };
  input.addEventListener('input', () => search(input.value));

  if (preview) {
    const queries = ['a', 'o', 'ber', '', 'p'];
    let n = 0;
    stage.every(() => {
      const q = queries[n++ % queries.length]!;
      input.value = q;
      search(q);
    }, 1.8, 0.8);
    return () => stage.dispose();
  }
  const p = panel(el);
  p.slider('Stagger (s)', { min: 0, max: 0.2, step: 0.01, value: gap }, (v) => { gap = v; });
  hint(el, 'Type to filter the cities. Each new result enters 0.05s after the one before it; drag the slider to change the gap.');
  return () => {
    stage.dispose();
    p.dispose();
  };
};

export default mount;
