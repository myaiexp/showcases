// tl.killTweensOf() by target and property, plus killing or reverting the whole timeline
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const arena = h('div', 'arena', '', wrap);
  const boxes = [0, 1, 2].map(() => h('div', 'box', '', arena));
  const out = h('pre', 'readout', '', wrap);

  let tl: gsap.core.Timeline | undefined;
  let timer = 0;
  const ctx = gsap.context((self) => {
    const show = (note: string): void => {
      const counts = boxes.map((b, i) => `box${i + 1}: ${tl ? tl.getTweensOf(b).length : 0}`).join('  ');
      out.textContent = `tweens left in tl  ${counts}\n${note}`;
    };
    const build = (): void => {
      tl?.revert();
      self.ignore(() => {
        gsap.set(boxes, { clearProps: 'all' });
        tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 1.4, ease: 'sine.inOut' } });
        boxes.forEach((b, i) => {
          tl!.to(b, { x: () => arena.clientWidth - 40 }, i * 0.2).to(b, { rotation: 270, duration: 0.9 }, i * 0.2);
        });
      });
      show('built: each box has an x tween and a rotation tween');
    };
    const steps: Array<[string, () => void]> = [
      ['killTweensOf(box 1, "rotation")', () => tl?.killTweensOf(boxes[0], 'rotation')],
      ['killTweensOf(box 2)', () => tl?.killTweensOf(boxes[1])],
      ['kill()', () => tl?.kill()],
      ['revert()', () => tl?.revert()],
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
        const k = n++ % 5;
        if (k === 4) build();
        else if (k < 2) apply(k);
        else if (k === 2) apply(3);
      }, 1600);
      return;
    }
    const bar = h('div', 'bar', '', wrap);
    steps.forEach(([label], i) => btn(label, () => apply(i), bar));
    btn('rebuild', build, bar);
    h(
      'p',
      'note',
      'killTweensOf() reaches into the timeline and kills only the tweens that touch the target (and the properties named). kill() stops the timeline where it is; revert() also puts the boxes back and removes their inline styles.',
      wrap,
    );
  }, el);

  return () => {
    clearInterval(timer);
    tl?.revert();
    ctx.revert();
  };
};

export default mount;
