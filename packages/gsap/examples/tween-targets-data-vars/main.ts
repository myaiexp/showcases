// A tween's targets(), data and vars read back, with data written from callbacks
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const row = h('div', 'row', '', wrap);
  ['one', 'two', 'three'].forEach((n) => h('div', `box dot ${n}`, '', row));
  const out = h('pre', 'readout', '', wrap);

  let timer = 0;
  const ctx = gsap.context(() => {
    // selector text is scoped to el by the context, targets() returns the matched elements
    const tween = gsap.to('.dot', {
      y: 34,
      scale: 0.7,
      duration: 0.8,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.2,
      data: { name: 'bounce', repeats: 0, clicks: 0 },
      onRepeat() {
        // callbacks run with the tween as `this`, so data is right there
        (this.data as { repeats: number }).repeats++;
        show();
      },
    });

    const show = (): void => {
      const names = tween.targets().map((t) => (t as HTMLElement).classList[2]);
      const v = tween.vars;
      out.textContent =
        `targets()  [${names.join(', ')}]  length ${tween.targets().length}\n` +
        `data       ${JSON.stringify(tween.data)}\n` +
        `vars       y:${v.y} scale:${v.scale} duration:${v.duration} ease:${v.ease} repeat:${v.repeat}`;
    };
    show();

    let i = 0;
    const highlight = (): void => {
      tween.targets().forEach((t, k) => (t as HTMLElement).classList.toggle('hl', k === i % 3));
      (tween.data as { clicks: number }).clicks++;
      i++;
      show();
    };
    if (preview) {
      timer = window.setInterval(highlight, 900);
      return;
    }
    const bar = h('div', 'bar', '', wrap);
    btn('highlight next target', highlight, bar);
    h(
      'p',
      'note',
      'vars is the object passed to gsap.to(), data starts as vars.data and is yours to write, targets() is always an array even for one selector.',
      wrap,
    );
  }, el);

  return () => {
    clearInterval(timer);
    ctx.revert();
  };
};

export default mount;
