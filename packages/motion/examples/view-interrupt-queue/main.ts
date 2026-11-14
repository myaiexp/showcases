// Rapid clicks on a view animation: queued one after another, or interrupting immediately
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import { viewStage } from '../../shared/view.ts';

const CSS = `
.track{position:relative;height:46px;border-radius:23px;background:var(--bg-surface);border:1px solid var(--border)}
.ball{position:absolute;top:5px;width:34px;height:34px;border-radius:50%;background:var(--accent);box-shadow:0 2px 8px rgba(0,0,0,.4)}
.bar{display:flex;gap:8px;justify-content:center;margin-top:12px}
.note{margin-top:10px;font-size:12px;color:var(--fg-2);text-align:center;min-height:2.6em}
`;
type Mode = 'wait' | 'immediate';
const SLOTS = 5;

const mount: Mount = async (el, { preview, signal }) => {
  const stage = await viewStage(el, { preview, signal, css: CSS });
  const { animateView } = stage.Motion;
  stage.app.innerHTML = `<div class="track"><i class="ball"></i></div>
    <div class="bar"><button class="one">Move</button><button class="burst">Click 5 times fast</button></div><div class="note"></div>`;
  const ball = stage.app.querySelector('.ball') as HTMLElement;
  const note = stage.app.querySelector('.note') as HTMLElement;
  let mode: Mode = 'wait';
  let slot = 0;
  let dir = 1;
  let burstStart = 0;
  const timers: number[] = [];
  ball.style.left = '5px';

  // `last` marks the final click of a burst: when it settles, the whole burst is over.
  const move = async (last = false): Promise<void> => {
    if (slot + dir < 0 || slot + dir >= SLOTS) dir = -dir;
    slot += dir;
    try {
      // interrupt: 'wait' (the default) queues this behind the running animation;
      // 'immediate' flushes the pending update and cuts in.
      // The d.ts types awaiting a view builder as void; at runtime it resolves to controls (docs).
      const animation = (await animateView(
        () => { ball.style.left = `calc((100% - 44px) * ${slot / (SLOTS - 1)} + 5px)`; },
        { duration: 0.6, ease: 'easeInOut', interrupt: mode },
      ).add('.ball')) as unknown as { finished: Promise<unknown> };
      await animation.finished;
    } catch {
      // an interrupted animation may reject: nothing to clean up
    } finally {
      if (last && burstStart) {
        note.textContent = `${mode === 'wait' ? 'Queued' : 'Interrupting'}: finished ${((performance.now() - burstStart) / 1000).toFixed(1)}s after the first click.`;
        burstStart = 0;
      }
    }
  };
  const burst = (): void => {
    burstStart = performance.now();
    note.textContent = '';
    for (let i = 0; i < 5; i++) timers.push(window.setTimeout(() => void move(i === 4), i * 90));
  };
  stage.app.querySelector('.one')?.addEventListener('click', () => void move());
  stage.app.querySelector('.burst')?.addEventListener('click', burst);

  if (preview) {
    let n = 0;
    stage.every(() => {
      mode = n++ % 2 ? 'immediate' : 'wait';
      note.textContent = mode === 'wait' ? 'interrupt: "wait"' : 'interrupt: "immediate"';
      for (let i = 0; i < 4; i++) timers.push(window.setTimeout(() => void move(), i * 90));
    }, 3.6, 0.8);
    return () => {
      stage.dispose();
      timers.forEach(clearTimeout);
    };
  }
  const p = panel(el);
  p.select('interrupt', ['wait', 'immediate'] as const, mode, (v) => { mode = v; });
  hint(el, 'Press "Click 5 times fast". With wait, the five moves line up and play out one by one; with immediate, each click cuts in and the whole burst finishes sooner.');
  return () => {
    stage.dispose();
    timers.forEach(clearTimeout);
    p.dispose();
  };
};

export default mount;
