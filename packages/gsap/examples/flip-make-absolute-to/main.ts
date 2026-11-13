// Flip.to vs Flip.from, Flip.makeAbsolute on its own, and Flip.isFlipping as a live lamp per card
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { btn, h } from '../../shared/ui.ts';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(Flip);

const mount: Mount = (el, { preview }) => {
  const lane = h('div', preview ? 'lane small' : 'lane', '', el);
  const cards = [1, 2, 3, 4].map((n) => h('div', 'card', preview ? '' : String(n), lane));
  const card1 = cards[0]!;
  const lamps = h('div', 'lamps', '', el);
  const lampEls = cards.map(() => h('span', 'lamp', '', lamps));
  const info = preview ? undefined : h('pre', 'info', '', el);

  let message = 'Press a button.';
  let absolute = false;
  let savedStyles: string[] = [];
  let running: gsap.core.Timeline | undefined;

  const busy = (): boolean => cards.some((c) => Flip.isFlipping(c));

  // Every frame: one lamp per card from Flip.isFlipping(), and the inline transform Flip leaves behind.
  const read = (): void => {
    cards.forEach((c, i) => lampEls[i]!.classList.toggle('on', Flip.isFlipping(c)));
    if (info) {
      info.textContent = `${message}\nlane class: "${lane.className.replace('lane', '').trim() || 'row'}"   card 1 inline transform: "${card1.style.transform}"\nisFlipping(card 1): ${Flip.isFlipping(card1)}   absolute: ${absolute}`;
    }
  };
  gsap.ticker.add(read);

  // Flip.from: change the layout first, then animate from where things were. The offsets are cleaned up at the end.
  const viaFrom = (): void => {
    if (busy()) return;
    const state = Flip.getState(cards);
    lane.classList.toggle('alt');
    running = Flip.from(state, { duration: 0.8, ease: 'power2.inOut', stagger: 0.05, scale: false });
    message = 'Flip.from: layout class changed first; at the end the inline offsets are removed.';
  };
  // Flip.to: capture the layout you want, go back to the current one, and animate toward the captured state.
  // Nothing removes the offsets afterwards, and the DOM layout itself did not change.
  const viaTo = (autoCommit: boolean): void => {
    if (busy()) return;
    lane.classList.toggle('alt');
    const target = Flip.getState(cards);
    lane.classList.toggle('alt');
    running = Flip.to(target, {
      duration: 0.8,
      ease: 'power2.inOut',
      stagger: 0.05,
      scale: false,
      onComplete: autoCommit ? commit : undefined,
    });
    message = 'Flip.to: animating toward the captured layout. The lane class has not changed, so the offsets stay.';
  };
  // Make the Flip.to result real: switch the class and drop the leftover inline styles.
  const commit = (): void => {
    for (const c of cards) c.style.cssText = '';
    lane.classList.toggle('alt');
    message = 'Committed: class switched and the inline offsets removed.';
  };
  // Flip.makeAbsolute: pin each card at its current spot with position: absolute (independent of any flip).
  const toggleAbsolute = (): void => {
    if (!absolute) {
      savedStyles = cards.map((c) => c.style.cssText);
      Flip.makeAbsolute(cards);
      message = 'Flip.makeAbsolute(cards): each card keeps its place but leaves the flow, so the lane collapses.';
    } else {
      cards.forEach((c, i) => { c.style.cssText = savedStyles[i] ?? ''; });
      message = 'Restored the original inline styles.';
    }
    absolute = !absolute;
  };

  let timer = 0;
  let step = 0;
  if (preview) {
    timer = window.setInterval(() => (step++ % 2 === 0 ? viaFrom() : viaTo(true)), 2400);
  } else {
    const bar = h('div', 'controls', '', el);
    btn('Flip.from', viaFrom, bar);
    btn('Flip.to', () => viaTo(false), bar);
    btn('Commit Flip.to', () => { if (!busy()) commit(); }, bar);
    btn('Flip.makeAbsolute / restore', toggleAbsolute, bar);
  }

  return () => {
    window.clearInterval(timer);
    gsap.ticker.remove(read);
    running?.kill();
  };
};

export default mount;
