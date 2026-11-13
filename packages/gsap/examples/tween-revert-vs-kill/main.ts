// Three identical tweens finish, then each is undone differently: progress(0), kill(), revert()
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import './style.css';

type Action = { tag: string; run: (t: gsap.core.Tween) => void };
const actions: Action[] = [
  { tag: 'progress(0).pause()', run: (t) => void t.progress(0).pause() },
  { tag: 'kill()', run: (t) => void t.kill() },
  { tag: 'revert()', run: (t) => void t.revert() },
];

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const rows = actions.map((a) => {
    const cell = h('div', 'cell', '', wrap);
    h('span', 'tag', a.tag, cell);
    const track = h('div', 'track', '', cell);
    return { track, box: h('div', 'box', '', track) };
  });
  const out = h('pre', 'attr', '', wrap);

  let tweens: gsap.core.Tween[] = [];
  let timers: number[] = [];
  const ctx = gsap.context((self) => {
    // Built inside ignore() so a rebuild per cycle does not pile up in the context;
    // the tweens are reverted by handle in the cleanup below.
    const build = (): void =>
      self.ignore(() => {
        tweens = rows.map((r) =>
          gsap.to(r.box, {
            x: () => r.track.clientWidth - 36,
            opacity: 0.3,
            rotation: 90,
            duration: 1,
            ease: 'power2.inOut',
          }),
        );
      });
    const show = (): void => {
      out.textContent = rows
        .map((r, i) => `${actions[i]!.tag}: style="${r.box.getAttribute('style') ?? ''}"`)
        .join('\n');
    };
    const undo = (): void => {
      actions.forEach((a, i) => a.run(tweens[i]!));
      show();
    };
    const play = (): void => {
      tweens.forEach((t) => t.revert());
      // kill() leaves its inline styles behind, so wipe them before the next run
      self.ignore(() => gsap.set(rows.map((r) => r.box), { clearProps: 'all' }));
      build();
      show();
    };
    build();

    if (preview) {
      const cycle = (): void => {
        play();
        timers.push(window.setTimeout(undo, 1500));
      };
      cycle();
      timers.push(window.setInterval(cycle, 3600));
      return;
    }
    const bar = h('div', 'bar', '', wrap);
    btn('replay all', play, bar);
    btn('undo each row', undo, bar);
    h(
      'p',
      'note',
      'Wait for the tweens to finish, then undo. progress(0) puts the start values back but leaves inline styles on the element, kill() freezes the box where it is, revert() restores the pre-animation state and removes the styles the tween added.',
      wrap,
    );
    const tick = window.setInterval(show, 120);
    timers.push(tick);
  }, el);

  return () => {
    timers.forEach(clearTimeout);
    timers.forEach(clearInterval);
    timers = [];
    tweens.forEach((t) => t.revert());
    ctx.revert();
  };
};

export default mount;
