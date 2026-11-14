// Thumbnails inside a shrinking clipped card: nested grouping keeps them in, group(false) lets them out
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import { viewStage } from '../../shared/view.ts';

const CSS = `
.card{width:100%;border-radius:16px;overflow:hidden;background:var(--bg-surface);border:1px solid var(--border);padding:10px}
.card.small{width:116px}
.card h3{margin:0 0 8px;font-size:11px;font-weight:500;color:var(--fg-3);white-space:nowrap}
.thumbs{display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end}
.card.small .thumbs{justify-content:flex-start}
.thumb{width:44px;height:44px;border-radius:10px}
.mode{margin-top:10px;font-size:11px;color:var(--fg-3);text-align:center}
.stage{height:120px}
`;
const COLOURS = ['#7c5cff', '#2fc4b2', '#ff7a59', '#f2b84b'];
type Grouping = 'nested (default)' | 'group(false)';

const mount: Mount = async (el, { preview, signal }) => {
  const stage = await viewStage(el, { preview, signal, css: CSS });
  const { animateView } = stage.Motion;
  stage.app.innerHTML = `<div class="stage"><div class="card"><h3>Holiday album</h3>
    <div class="thumbs">${COLOURS.map((c) => `<i class="thumb" style="background:${c}"></i>`).join('')}</div></div></div>
    <div class="mode"></div><div style="text-align:center;margin-top:8px"><button>Shrink the card</button></div>`;
  const card = stage.app.querySelector('.card') as HTMLElement;
  const mode = stage.app.querySelector('.mode') as HTMLElement;
  const button = stage.app.querySelector('button') as HTMLButtonElement;
  let grouping: Grouping = 'nested (default)';

  const flip = (): void => {
    const small = !card.classList.contains('small');
    mode.textContent = grouping;
    const view = animateView(() => {
      card.classList.toggle('small', small);
      button.textContent = small ? 'Grow the card' : 'Shrink the card';
    }, { duration: 0.7, ease: 'easeInOut' })
      .add('.card');
    // The thumbnails wait 0.25s before moving. Nested, they wait inside the card's own box;
    // flattened with group(false), they wait where they were while the card shrinks past them.
    const thumbs = view.add('.thumb').layout({ delay: 0.25 });
    if (grouping === 'group(false)') thumbs.group(false);
  };
  button.addEventListener('click', flip);
  mode.textContent = grouping;

  if (preview) {
    let n = 0;
    stage.every(() => {
      // Every other round runs ungrouped, so the card shows both behaviours.
      if (card.classList.contains('small')) grouping = n++ % 2 ? 'group(false)' : 'nested (default)';
      flip();
    }, 1.8, 0.8);
    return () => stage.dispose();
  }
  const p = panel(el);
  p.select('Grouping', ['nested (default)', 'group(false)'] as const, grouping, (v) => { grouping = v; mode.textContent = v; });
  hint(el, 'Shrink the card with each setting. Nested, the thumbnails stay inside the card while they wait their turn; with group(false) they stay behind and visibly break out of the clipped card.');
  return () => {
    stage.dispose();
    p.dispose();
  };
};

export default mount;
