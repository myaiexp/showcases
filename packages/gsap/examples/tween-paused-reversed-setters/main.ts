// paused(bool) and reversed(bool) as setters, next to play(), resume() and restart(includeDelay)
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, check, h } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const track = h('div', 'track', '', wrap);
  const box = h('div', 'box', '', track);
  const out = h('pre', 'readout', '', wrap);

  let timer = 0;
  const ctx = gsap.context(() => {
    let pausedBox: HTMLInputElement | undefined;
    let reversedBox: HTMLInputElement | undefined;
    const tween = gsap.to(box, {
      x: () => track.clientWidth - 36,
      duration: 2,
      delay: 1,
      ease: 'power1.inOut',
      onUpdate: show,
    });

    function show(): void {
      if (pausedBox) pausedBox.checked = tween.paused();
      if (reversedBox) reversedBox.checked = tween.reversed();
      out.textContent =
        `paused() ${String(tween.paused()).padEnd(5)}  reversed() ${String(tween.reversed()).padEnd(5)}\n` +
        `time() ${tween.time().toFixed(2)}  progress() ${tween.progress().toFixed(2)}  delay() ${tween.delay()}`;
    }
    const act = (fn: () => void): (() => void) => () => {
      fn();
      show();
    };
    show();

    if (preview) {
      let n = 0;
      timer = window.setInterval(() => {
        n++;
        if (n % 4 === 0) tween.restart(true);
        else tween.reversed(!tween.reversed()).paused(false);
        show();
      }, 1400);
      return;
    }
    const bar = h('div', 'bar', '', wrap);
    pausedBox = check('paused(bool)', (on) => { tween.paused(on); show(); }, bar);
    reversedBox = check('reversed(bool)', (on) => { tween.reversed(on); show(); }, bar);
    const bar2 = h('div', 'bar', '', wrap);
    btn('play()', act(() => tween.play()), bar2);
    btn('play(0)', act(() => tween.play(0)), bar2);
    btn('resume()', act(() => tween.resume()), bar2);
    btn('reverse()', act(() => tween.reverse()), bar2);
    btn('restart()', act(() => tween.restart()), bar2);
    btn('restart(true)', act(() => tween.restart(true)), bar2);
    h(
      'p',
      'note',
      'The tween has a 1s delay. restart() skips the delay, restart(true) includes it. play(0) jumps to the start first, resume() continues from where the playhead is. Setting reversed(true) flips direction without moving the playhead.',
      wrap,
    );
  }, el);

  return () => {
    clearInterval(timer);
    ctx.revert();
  };
};

export default mount;
