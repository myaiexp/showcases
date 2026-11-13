// tl.from(), to(), fromTo() and set() chained, with the timeline's own vars, data and delay read back
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { h } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const track = h('div', 'track', '', wrap);
  const box = h('div', 'box', '', track);
  const steps = h('div', 'steps', '', wrap);
  const labels = ['from()', 'to()', 'fromTo()', 'set()', 'to()'].map((t) => h('span', 'step', t, steps));
  const out = h('pre', 'readout', '', wrap);

  const ctx = gsap.context(() => {
    const W = (): number => track.clientWidth - 36;
    const tl = gsap.timeline({
      id: 'chain',
      data: { owner: 'convenience demo' },
      delay: 0.4,
      repeat: -1,
      repeatDelay: 0.6,
      defaults: { duration: 0.7, ease: 'power2.inOut' },
      onUpdate: mark,
    });
    // every method adds to the end of the timeline, like add(gsap.xxx(...))
    tl.from(box, { y: -50, opacity: 0 })
      .to(box, { x: () => W() / 2, rotation: 90 })
      .fromTo(box, { scale: 0.5 }, { scale: 1.4 })
      .set(box, { backgroundColor: '#e0623d' })
      .to(box, { x: W, rotation: 180, scale: 1 });

    function mark(): void {
      const kids = tl.getChildren(false);
      let on = -1;
      kids.forEach((k, i) => {
        if (k.startTime() <= tl.time()) on = i;
      });
      labels.forEach((l, i) => l.classList.toggle('on', i === on));
    }
    mark();

    const parent = tl.parent === gsap.globalTimeline ? 'gsap.globalTimeline' : 'another timeline';
    out.textContent = preview
      ? `children ${tl.getChildren(false).length}  duration() ${tl.duration().toFixed(1)}  delay() ${tl.delay()}`
      : `tl.vars.id "${tl.vars.id}"   tl.data ${JSON.stringify(tl.data)}\n` +
        `tl.delay() ${tl.delay()}  tl.parent is ${parent}\n` +
        `children ${tl.getChildren(false).length}  duration() ${tl.duration().toFixed(1)}  (the set() adds none)`;

    if (preview) return;
    h(
      'p',
      'note',
      'Each method appends to the end (a position argument would place it elsewhere). The delay and data come from the timeline\'s own vars; a new timeline sits on the global timeline until it is nested.',
      wrap,
    );
  }, el);

  return () => ctx.revert();
};

export default mount;
