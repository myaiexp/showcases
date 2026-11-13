// One tween over two boxes, killed in part by target and by property name
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const arena = h('div', 'arena', '', wrap);
  const a = h('div', 'box a', '', arena);
  const b = h('div', 'box b', '', arena);
  const out = h('pre', 'readout', '', wrap);

  let tween: gsap.core.Tween | undefined;
  let timer = 0;
  const ctx = gsap.context((self) => {
    // The tween is rebuilt on demand, so it lives in ignore() and is killed by handle.
    const build = (): void => {
      tween?.kill();
      self.ignore(() => {
        gsap.set([a, b], { clearProps: 'all' });
        tween = gsap.to([a, b], {
          x: () => arena.clientWidth - 42,
          y: (i) => (i === 0 ? 40 : -40),
          rotation: (i) => (i === 0 ? 360 : -360),
          duration: 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.25,
        });
      });
      show('built: 2 targets, x + y + rotation');
    };
    const show = (note: string): void => {
      out.textContent =
        `targets().length = ${tween?.targets().length ?? 0}   isActive() = ${tween?.isActive() ?? false}\n${note}`;
    };
    const steps: Array<[string, () => void]> = [
      ["kill(null, 'rotation')", () => tween?.kill(undefined, 'rotation')],
      ['kill(box A)', () => tween?.kill(a)],
      ["kill(box B, 'x,y')", () => tween?.kill(b, 'x,y')],
      ['kill()', () => tween?.kill()],
    ];
    const apply = (i: number): void => {
      const [label, fn] = steps[i]!;
      fn();
      show(`${label} called`);
    };
    build();

    if (preview) {
      let n = 0;
      timer = window.setInterval(() => {
        if (n % 5 === 4) build();
        else apply(n % 5);
        n++;
      }, 1500);
      return;
    }
    const bar = h('div', 'bar', '', wrap);
    steps.forEach(([label], i) => btn(label, () => apply(i), bar));
    btn('rebuild', build, bar);
    h(
      'p',
      'note',
      'The first argument picks targets, the second a comma-separated list of property names. Everything not named keeps tweening; kill() with no arguments ends the whole tween.',
      wrap,
    );
  }, el);

  return () => {
    clearInterval(timer);
    tween?.kill();
    ctx.revert();
  };
};

export default mount;
