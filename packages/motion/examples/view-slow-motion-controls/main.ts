// Awaiting animateView returns controls: pause, play, change speed and wait for finished
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import { viewStage } from '../../shared/view.ts';

const CSS = `
.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.tile{height:62px;border-radius:12px;display:grid;place-items:center;color:#fff;font-weight:600;font-size:18px}
.status{margin-top:10px;font-size:12px;color:var(--fg-2);text-align:center}
`;
// The d.ts types awaiting a view builder as void; at runtime it resolves to controls (docs).
interface Controls { pause(): void; play(): void; speed: number; finished: Promise<unknown> }
const COLOURS = ['#7c5cff', '#2fc4b2', '#ff7a59', '#f2b84b'];

const mount: Mount = async (el, { preview, signal }) => {
  const stage = await viewStage(el, { preview, signal, css: CSS });
  const { animateView } = stage.Motion;
  stage.app.innerHTML = `<div class="grid">${COLOURS.map((c, i) => `<div class="tile" style="background:${c}">${i + 1}</div>`).join('')}</div><div class="status"></div>`;
  const grid = stage.app.querySelector('.grid') as HTMLElement;
  const status = stage.app.querySelector('.status') as HTMLElement;
  let animation: Controls | null = null;
  let speed = 1;

  const shuffle = async (): Promise<void> => {
    status.textContent = 'running';
    const run = (await animateView(() => grid.append(...[...grid.children].reverse()), { duration: 1.2, ease: 'easeInOut' }).add('.tile')) as unknown as Controls;
    animation = run;
    run.speed = speed;
    // finished resolves when the view animation has played to the end.
    await run.finished.then(() => { if (animation === run) status.textContent = 'finished'; }, () => undefined);
  };

  if (preview) {
    speed = 0.4;
    status.textContent = 'slow motion: speed 0.4';
    stage.every(() => void shuffle(), 3.2, 0.8);
    return () => stage.dispose();
  }
  const p = panel(el);
  p.button('Swap tiles', () => void shuffle());
  p.button('Pause', () => animation?.pause());
  p.button('Play', () => animation?.play());
  p.select('Speed', ['1x', '0.5x', '0.2x'] as const, '1x', (v) => {
    speed = Number.parseFloat(v);
    if (animation) animation.speed = speed;
  });
  status.textContent = 'idle';
  hint(el, 'Swap the tiles, then pause mid-way, resume, or change the speed while it plays. The status line below the tiles updates when await animation.finished resolves.');
  return () => {
    stage.dispose();
    p.dispose();
  };
};

export default mount;
