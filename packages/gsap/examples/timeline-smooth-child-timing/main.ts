// Reverse a child mid-play in two timelines: smoothChildTiming true keeps its position, false mirrors it
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const lanes = [true, false].map((smooth) => {
    const cell = h('div', smooth ? 'cell' : 'cell off', `smoothChildTiming: ${smooth}`, wrap);
    const track = h('div', 'track', '', cell);
    return { smooth, track, box: h('div', 'box', '', track) };
  });
  const out = h('pre', 'readout', '', wrap);

  let timer = 0;
  let built: Array<{ tl: gsap.core.Timeline; child: gsap.core.Tween }> = [];
  const ctx = gsap.context((self) => {
    const show = (note = ''): void => {
      out.textContent =
        built
          .map(
            (b, i) =>
              `smooth ${String(lanes[i]!.smooth).padEnd(5)}  tl.time() ${b.tl.time().toFixed(2)}  child.startTime() ${b.child.startTime().toFixed(2)}  child.progress() ${b.child.progress().toFixed(2)}`,
          )
          .join('\n') + (note ? `\n${note}` : '');
    };
    // Rebuilt for every run, so it sits in ignore() and is killed by handle.
    const build = (): void => {
      built.forEach((b) => b.tl.kill());
      self.ignore(() => {
        gsap.set(lanes.map((l) => l.box), { clearProps: 'all' });
        built = lanes.map((l) => {
          const tl = gsap.timeline({ smoothChildTiming: l.smooth, onUpdate: () => show() });
          const child = gsap.to(l.box, {
            x: () => l.track.clientWidth - 36,
            duration: 4,
            ease: 'none',
          });
          tl.add(child, 0);
          return { tl, child };
        });
      });
      show('both timelines play forward');
    };
    const flip = (): void => {
      built.forEach((b) => b.child.reverse());
      show('child.reverse() called on both children');
    };
    build();

    if (preview) {
      const cycle = (): void => {
        build();
        timer = window.setTimeout(flip, 1400);
      };
      cycle();
      const loop = window.setInterval(cycle, 4200);
      return () => clearInterval(loop);
    }
    const bar = h('div', 'bar', '', wrap);
    btn('child.reverse()', flip, bar);
    btn('restart both', build, bar);
    h(
      'p',
      'note',
      'Reverse while the playhead is partway along. With smoothChildTiming the child\'s startTime is adjusted so it carries on from where it is, now heading back. Without it the child flips in place and jumps to the mirrored spot.',
      wrap,
    );
  }, el);

  return () => {
    clearTimeout(timer);
    built.forEach((b) => b.tl.kill());
    ctx.revert();
  };
};

export default mount;
