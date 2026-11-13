// restart() replays recorded values, invalidate() re-parses relative and random ones
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const lane = (tag: string): { track: HTMLElement; box: HTMLElement } => {
    const cell = h('div', 'cell', '', wrap);
    h('span', 'tag', tag, cell);
    const track = h('div', 'track', '', cell);
    return { track, box: h('div', 'box', '', track) };
  };
  const rel = lane('rotation +=90');
  const rnd = lane('x random()');
  const out = h('pre', 'readout', '', wrap);

  let timer = 0;
  const ctx = gsap.context(() => {
    const t1 = gsap.to(rel.box, { rotation: '+=90', duration: 0.6, ease: 'power2.inOut', paused: true });
    const t2 = gsap.to(rnd.box, {
      x: () => `random(0, ${rnd.track.clientWidth - 36}, 4)`,
      duration: 0.6,
      ease: 'power2.inOut',
      paused: true,
    });
    const show = (note: string): void => {
      out.textContent =
        `${note}\nrotation ${Math.round(Number(gsap.getProperty(rel.box, 'rotation')))}deg` +
        `   x ${Math.round(Number(gsap.getProperty(rnd.box, 'x')))}px`;
    };
    const plain = (): void => {
      t1.restart();
      t2.restart();
      show('restart(): same start and end values again');
    };
    const inval = (): void => {
      t1.invalidate().restart();
      t2.invalidate().restart();
      show('invalidate().restart(): values parsed again');
    };
    show('press a button');

    if (preview) {
      let n = 0;
      const tick = (): void => (n++ % 2 ? inval() : plain());
      tick();
      timer = window.setInterval(tick, 1400);
      return;
    }
    const bar = h('div', 'bar', '', wrap);
    btn('restart()', plain, bar);
    btn('invalidate() + restart()', inval, bar);
    h(
      'p',
      'note',
      'restart() keeps the recorded start and end, so the rotation snaps back and repeats the same 90 degrees and x lands on the same random spot. After invalidate() the next render re-parses "+=90" from the current rotation and rolls a new random x.',
      wrap,
    );
  }, el);

  return () => {
    clearInterval(timer);
    ctx.revert();
  };
};

export default mount;
