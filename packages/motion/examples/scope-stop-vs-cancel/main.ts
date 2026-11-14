// A dashboard of running animations and gestures: scope.stop() freezes it, scope.cancel() resets it, refresh() restarts it
import { animate, delay, drag, hover, scopeMotion } from 'motion';
import type { MotionScope } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="dash${preview ? '' : ' full'}">
      <div class="tiles">
        <div class="tile"><div class="spinner"></div><span>spinner</span></div>
        <div class="tile"><div class="bar"><i></i></div><span>bar</span></div>
        <div class="tile hoverable"><div class="orb"></div><span>hover me</span></div>
        <div class="tile"><div class="chip">drag</div><span>drag me</span></div>
      </div>
      <div class="state"><span>scope.state</span> <b class="st"></b> <em class="what"></em></div>
    </div>`;
  const stateEl = el.querySelector<HTMLElement>('.st')!;
  const whatEl = el.querySelector<HTMLElement>('.what')!;
  let scope: MotionScope;
  let p: ReturnType<typeof panel> | undefined;

  const show = (what: string): void => {
    stateEl.textContent = scope.state;
    stateEl.dataset.state = scope.state;
    whatEl.textContent = what;
  };

  // The dashboard's own scope: everything the demo animates is collected here.
  const build = (): void => {
    scope = scopeMotion(el, () => {
      animate('.spinner', { rotate: 360 }, { duration: 1.4, repeat: Infinity, ease: 'linear' });
      animate('.bar i', { width: ['15%', '100%'] }, { duration: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' });
      hover('.hoverable', () => {
        animate('.orb', { scale: 1.5, backgroundColor: '#ffd24a' }, { type: 'spring', bounce: 0.4, visualDuration: 0.3 });
        return () => animate('.orb', { scale: 1, backgroundColor: '#8aa4ff' }, { duration: 0.2 });
      });
      drag('.chip', {});
    });
    show('running');
  };

  // Something outside the dashboard's scope drives the card's loop: a scope that
  // stopped itself could not start itself again.
  const driver = scopeMotion(el, () => {
    if (!preview) return;
    const act = (name: string, fn: () => void, next: () => void, wait: number): void => {
      fn();
      show(name);
      delay(next, wait);
    };
    const run = (): void => {
      build();
      delay(() => act('stop(): frozen where it was', () => scope.stop(), () => act('cancel(): back to the start', () => scope.cancel(), run, 1.8), 2), 2.4);
    };
    run();
  });

  if (!preview) {
    build();
    hint(el, 'Let it run, then Stop: everything freezes where it is and hover and drag stop answering. Cancel: the same, then styles go back to how they started. Refresh: back to the start, running again.');
    p = panel(el);
    p.button('stop()', () => { scope.stop(); show('frozen where it was'); });
    p.button('cancel()', () => { scope.cancel(); show('reset to the start'); });
    p.button('refresh()', () => { scope.refresh(); show('restarted'); });
    p.button('New scope', () => { scope.cancel(); build(); });
  }

  return () => { driver.cancel(); scope.cancel(); p?.dispose(); };
};

export default mount;
