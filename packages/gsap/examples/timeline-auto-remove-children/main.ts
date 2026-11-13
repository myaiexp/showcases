// A timeline with autoRemoveChildren drops each child as it completes, so reverse() has nothing to replay
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const lanes = [false, true].map((auto) => {
    const cell = h('div', auto ? 'cell off' : 'cell', `autoRemoveChildren: ${auto}`, wrap);
    const track = h('div', 'track', '', cell);
    return { auto, track, box: h('div', 'box', '', track) };
  });
  const out = h('pre', 'readout', '', wrap);

  let timers: number[] = [];
  let tls: gsap.core.Timeline[] = [];
  const ctx = gsap.context((self) => {
    const show = (note = ''): void => {
      out.textContent =
        tls
          .map((t, i) => `auto ${String(lanes[i]!.auto).padEnd(5)}  children left ${t.getChildren(false).length}  time() ${t.time().toFixed(2)}  reversed() ${t.reversed()}`)
          .join('\n') + (note ? `\n${note}` : '');
    };
    const build = (): void => {
      tls.forEach((t) => t.kill());
      timers.forEach(clearTimeout);
      self.ignore(() => {
        gsap.set(lanes.map((l) => l.box), { clearProps: 'all' });
        tls = lanes.map((l) => {
          const w = (): number => l.track.clientWidth - 36;
          const tl = gsap.timeline({
            autoRemoveChildren: l.auto,
            defaults: { duration: 0.7, ease: 'power1.inOut' },
            onUpdate: () => show(),
          });
          tl.to(l.box, { x: () => w() / 3 }).to(l.box, { x: () => (w() * 2) / 3 }).to(l.box, { x: w });
          return tl;
        });
      });
      show('three tweens each, playing forward');
    };
    const back = (): void => {
      tls.forEach((t) => t.reverse());
      show('reverse() called on both');
    };
    build();

    if (preview) {
      const cycle = (): void => {
        build();
        timers.push(window.setTimeout(back, 2800));
      };
      cycle();
      timers.push(window.setInterval(cycle, 5600));
      return;
    }
    const bar = h('div', 'bar', '', wrap);
    btn('reverse() after it finishes', back, bar);
    btn('restart both', build, bar);
    h(
      'p',
      'note',
      'With autoRemoveChildren the timeline releases each child as soon as it completes, which saves memory but means there is nothing left to play backwards. The root timeline works this way.',
      wrap,
    );
  }, el);

  return () => {
    timers.forEach(clearTimeout);
    timers.forEach(clearInterval);
    tls.forEach((t) => t.kill());
    ctx.revert();
  };
};

export default mount;
