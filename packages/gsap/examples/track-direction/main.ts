// Direction readouts for a tween reversed directly and a tween nested in a reversed timeline
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import { trackDirection } from './trackDirection.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const root = h('div', preview ? 'root compact' : 'root', '', el);
  const mkRow = (label: string): { box: HTMLElement; out: HTMLElement } => {
    const row = h('div', 'row', '', root);
    const box = h('div', 'box', '', row);
    const col = h('div', 'col', '', row);
    h('span', 'tag', label, col);
    return { box, out: h('span', 'out', 'direction: 1', col) };
  };
  const a = mkRow('onUpdate: trackDirection(fn)');
  const b = mkRow('trackDirection(tween), nested in a reversed timeline');
  if (preview) b.box.parentElement?.remove();

  const toggles = { a: 0, b: 0 };
  let tweenA: gsap.core.Tween | undefined;
  let tweenB: gsap.core.Tween | undefined;
  let parentTl: gsap.core.Timeline | undefined;
  const ctx = gsap.context(() => {
    // 1) the helper's return value used directly as the onUpdate callback
    tweenA = gsap.to(a.box, {
      rotation: 360,
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: trackDirection((d) => { a.out.textContent = `direction: ${d}   toggles: ${toggles.a}`; }),
    });
    if (preview) return;
    // 2) assigned to an animation that is nested in a timeline which itself gets reversed
    parentTl = gsap.timeline();
    tweenB = gsap.to(b.box, { rotation: 360, duration: 3, ease: 'power2.inOut' });
    parentTl.add(tweenB);
    trackDirection({
      animation: tweenB,
      onToggle: () => toggles.b++,
      onUpdate: (d) => { b.out.textContent = `direction: ${d}   toggles: ${toggles.b}`; },
    });
    tweenA.eventCallback('onUpdate', trackDirection({
      onToggle: () => toggles.a++,
      onUpdate: (d) => { a.out.textContent = `direction: ${d}   toggles: ${toggles.a}`; },
    }));
  }, el);

  let timer: number | undefined;
  if (preview) {
    // the card flips the tween every 1.7s, as a click would
    timer = window.setInterval(() => tweenA?.reversed(!tweenA.reversed()), 1700);
  } else {
    const bar = h('div', 'controls', '', root);
    btn('reverse the tween', () => tweenA?.reversed(!tweenA.reversed()), bar);
    btn('reverse the parent timeline', () => parentTl?.reversed(!parentTl.reversed()), bar);
    h('p', 'readout', 'The second tween is never reversed itself, only its parent is, yet its direction still flips. The value updates on the next tick, not immediately.', root);
  }

  return () => {
    if (timer) window.clearInterval(timer);
    ctx.revert();
  };
};

export default mount;
