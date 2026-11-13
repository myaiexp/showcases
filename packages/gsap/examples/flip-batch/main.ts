// Flip.batch: two independent components register actions, and one run() gets state, sets state, then animates for both
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { btn, h } from '../../shared/ui.ts';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(Flip);

const mount: Mount = (el, { preview }) => {
  const row = h('div', preview ? 'row small' : 'row', '', el);
  // Component A: tiles that switch between a grid and a list
  const boxA = h('div', 'comp a', '', row);
  const tiles = [1, 2, 3, 4, 5, 6].map((n) => h('div', 'tile', preview ? '' : String(n), boxA));
  // Component B: chips whose order flips
  const boxB = h('div', 'comp b', '', row);
  const chips = ['A', 'B', 'C', 'D', 'E'].map((c) => h('div', 'chip', preview ? '' : c, boxB));
  const log = preview ? undefined : h('pre', 'log', '', el);

  const lines: string[] = [];
  const say = (msg: string): void => {
    if (!log) return;
    lines.push(msg);
    if (lines.length > 8) lines.shift();
    log.textContent = lines.join('\n');
  };

  let external = false; // true while the page changes state itself between batch.getState() and run(true)
  const changeA = (): void => { boxA.classList.toggle('list'); };
  const changeB = (): void => { boxB.append(...[...boxB.children].reverse()); };

  let batch: ReturnType<typeof Flip.batch> | undefined;
  const ctx = gsap.context(() => {
    // One id, one batch. Created inside the context so its timeline is reverted with it.
    batch = Flip.batch('two-components');
    batch.add({
      getState: () => { say('A getState'); return Flip.getState(tiles); },
      setState: () => { say('A setState'); if (!external) changeA(); },
      animate: (self) => { say('A animate'); Flip.from(self.state, { duration: 0.8, ease: 'power2.inOut', stagger: 0.03, absolute: true }); },
      onStart: () => say('onStart'),
      onComplete: () => say('onComplete'),
    });
    batch.add({
      getState: () => { say('B getState'); return Flip.getState(chips); },
      setState: () => { say('B setState'); if (!external) changeB(); },
      animate: (self) => { say('B animate'); Flip.from(self.state, { duration: 0.8, ease: 'power2.inOut', stagger: 0.05 }); },
    });
  }, el);

  let timer = 0;
  if (preview) {
    timer = window.setInterval(() => batch?.run(), 2300);
  } else {
    const bar = h('div', 'controls', '', el);
    btn('batch.run()', () => { lines.length = 0; batch?.run(); }, bar);
    btn('getState(), change, run(true)', () => {
      lines.length = 0;
      // Split form: only the getState() part now, the state changes outside the batch, then run(true) skips getState.
      batch?.getState();
      external = true;
      changeA();
      changeB();
      batch?.run(true);
      external = false;
    }, bar);
    h('p', 'note', 'Both components are Flipped by one batch. The log shows the order: every getState first, then every setState, then every animate, so one component\'s change cannot disturb the other\'s measurements. The second button splits run() so you change the DOM yourself in between.', el);
  }

  return () => {
    window.clearInterval(timer);
    // kill() unregisters the id; the batch's own timeline goes with the context
    batch?.kill();
    ctx.revert();
  };
};

export default mount;
