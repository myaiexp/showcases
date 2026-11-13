// Step a paused timeline with nextLabel() and previousLabel(); removeLabel() and labels show the changes
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const arena = h('div', 'arena', '', wrap);
  const dot = h('div', 'box', '', arena);
  const chips = h('div', 'chips', '', wrap);
  const out = h('pre', 'readout', '', wrap);

  let timer = 0;
  let hop: gsap.core.Tween | undefined;
  const ctx = gsap.context(() => {
    const W = (): number => arena.clientWidth - 44;
    const H = (): number => arena.clientHeight - 44;
    const tl = gsap.timeline({ paused: true, defaults: { duration: 1, ease: 'power1.inOut' } });
    tl.addLabel('top-left')
      .to(dot, { x: W }, 'top-right')
      .to(dot, { y: H }, 'bottom-right')
      .to(dot, { x: 0 }, 'bottom-left')
      .addLabel('end');

    const show = (note: string): void => {
      chips.replaceChildren();
      const cur = tl.currentLabel();
      for (const name of Object.keys(tl.labels)) {
        h('span', name === cur ? 'chip on' : 'chip', name, chips);
      }
      out.textContent =
        `time ${tl.time().toFixed(2)}  currentLabel() "${cur}"\n` +
        `previousLabel() "${tl.previousLabel()}"  nextLabel() "${tl.nextLabel()}"\n${note}`;
    };
    const go = (label: string | undefined, how: string): void => {
      if (!label) return show(`${how}: no label there`);
      hop?.kill();
      ctx.ignore(() => { hop = tl.tweenTo(label, { onUpdate: () => show('') }); });
      show(`${how} -> tweenTo("${label}")`);
    };
    show('labels are the stops of this timeline');

    if (preview) {
      timer = window.setInterval(() => {
        tl.seek(tl.nextLabel() ?? 0);
        show('seek(nextLabel() ?? 0)');
      }, 1000);
      return;
    }
    const bar = h('div', 'bar', '', wrap);
    btn('previousLabel()', () => go(tl.previousLabel(), 'previousLabel()'), bar);
    btn('nextLabel()', () => go(tl.nextLabel(), 'nextLabel()'), bar);
    btn('removeLabel(current)', () => {
      const cur = tl.currentLabel();
      if (cur) tl.removeLabel(cur);
      show(`removeLabel("${cur}")`);
    }, bar);
    btn('addLabel("mid", 1.5)', () => {
      tl.addLabel('mid', 1.5);
      show('addLabel("mid", 1.5)');
    }, bar);
    btn('seek(0)', () => { hop?.kill(); tl.seek(0); show('seek(0)'); }, bar);
    h(
      'p',
      'note',
      'A label at the exact current time is ignored by nextLabel() and previousLabel(), so they always move you to a different stop. Labels live in tl.labels.',
      wrap,
    );
  }, el);

  return () => {
    clearInterval(timer);
    hop?.kill();
    ctx.revert();
  };
};

export default mount;
