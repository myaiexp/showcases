// Four ways to start work after setup: scope.bind and scope.run join the scope, a plain handler and scope.ignore stay outside it
import { animate, delay, scopeMotion } from 'motion';
import type { AnimationPlaybackControls, MotionScope } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const LANES = [
  { id: 'a', title: 'click handler wrapped in scope.bind()', after: 'stops with the scope' },
  { id: 'b', title: 'after an await, wrapped in scope.run()', after: 'stops with the scope' },
  { id: 'c', title: 'plain click handler, nothing wrapped', after: 'keeps running: the scope never saw it' },
  { id: 'd', title: 'started inside scope.ignore()', after: 'keeps running, on purpose' },
] as const;
type Lane = (typeof LANES)[number]['id'];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="lanes${preview ? '' : ' full'}">
      ${LANES.map((l) => `<div class="lane" data-lane="${l.id}"><button class="btn go">start</button><div class="rail"><i class="dot"></i></div><div class="cap"><b>${l.title}</b><span>after stop(): ${l.after}</span></div></div>`).join('')}
      <div class="state"><span>scope.state</span> <b class="st"></b></div>
    </div>`;
  const q = (lane: Lane, s: string): HTMLElement => el.querySelector<HTMLElement>(`[data-lane="${lane}"] ${s}`)!;
  const stateEl = el.querySelector<HTMLElement>('.st')!;
  const running = new Map<Lane, AnimationPlaybackControls>();
  const timers = new Set<number>();
  const ac = new AbortController();
  let scope: MotionScope;
  let p: ReturnType<typeof panel> | undefined;

  const show = (): void => {
    stateEl.textContent = scope.state;
    stateEl.dataset.state = scope.state;
  };
  // The moving dot is the same in every lane. What differs is who owns the animation.
  const move = (lane: Lane): void => {
    running.get(lane)?.stop();
    running.set(lane, animate(q(lane, '.dot'), { x: [0, 110] }, { duration: 0.9, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }));
  };

  const build = (): void => {
    scope = scopeMotion(el, (s) => {
      // A: bind() returns a handler that always runs in this scope.
      const onA = s.bind(() => move('a'));
      // B: work after an await runs outside the scope unless it is wrapped in run().
      const onB = async (): Promise<void> => {
        await new Promise<void>((resolve) => { const id = window.setTimeout(() => { timers.delete(id); resolve(); }, 400); timers.add(id); });
        if (s.state === 'active') s.run(() => move('b'));
      };
      q('a', '.go').addEventListener('click', onA);
      q('b', '.go').addEventListener('click', onB);
      // D: ignore() starts it outside every scope.
      s.ignore(() => move('d'));
      return () => {
        q('a', '.go').removeEventListener('click', onA);
        q('b', '.go').removeEventListener('click', onB);
      };
    });
    show();
  };

  // C is an ordinary listener, added once: whatever it starts belongs to nobody.
  q('c', '.go').addEventListener('click', () => move('c'), { signal: ac.signal });

  const reset = (): void => {
    scope.cancel();
    for (const c of running.values()) c.stop();
    running.clear();
    for (const l of LANES) q(l.id, '.dot').style.transform = '';
    build();
  };
  const startAll = (): void => { q('a', '.go').click(); q('b', '.go').click(); q('c', '.go').click(); };

  build();
  const driver = scopeMotion(el, () => {
    if (!preview) return;
    const loop = (): void => {
      reset();
      delay(startAll, 0.2);
      delay(() => { scope.stop(); show(); }, 2.6);
      delay(loop, 5.2);
    };
    loop();
  });
  if (!preview) {
    hint(el, 'Start all four, then press scope.stop(). The first two freeze with the scope; the plain handler and the ignored work carry on, because the scope never collected them.');
    p = panel(el);
    p.button('Start all', startAll);
    p.button('scope.stop()', () => { scope.stop(); show(); });
    p.button('Reset', reset);
  }

  return () => {
    driver.cancel();
    scope.cancel();
    ac.abort();
    for (const c of running.values()) c.stop();
    for (const id of timers) window.clearTimeout(id);
    p?.dispose();
  };
};

export default mount;
