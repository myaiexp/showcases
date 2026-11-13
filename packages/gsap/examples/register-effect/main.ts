// Registers two reusable effects, then calls them via gsap.effects and directly on a timeline
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

interface FxConfig {
  duration: number;
  distance: number;
}
// extendTimeline adds each effect's name to Timeline's prototype; describe that for TypeScript.
type FxTimeline = gsap.core.Timeline & {
  popIn(targets: gsap.TweenTarget, config?: Partial<FxConfig>, position?: gsap.Position): FxTimeline;
  shake(targets: gsap.TweenTarget, config?: Partial<FxConfig>, position?: gsap.Position): FxTimeline;
};

const mount: Mount = (el, { preview }) => {
  const row = document.createElement('div');
  row.className = 'row';
  const boxes: HTMLElement[] = [];
  for (let i = 0; i < 4; i++) {
    const b = document.createElement('div');
    b.className = 'box';
    row.append(b);
    boxes.push(b);
  }
  el.append(row);

  // Effects are global to GSAP, so register them once per mount (re-registering the same name just replaces it).
  gsap.registerEffect({
    name: 'popIn',
    defaults: { duration: 0.5, distance: 0 },
    extendTimeline: true,
    effect: (targets: gsap.TweenTarget, config: FxConfig) =>
      gsap.fromTo(
        targets,
        { scale: 0, opacity: 0, y: config.distance },
        { scale: 1, opacity: 1, y: 0, duration: config.duration, ease: 'power1.out', stagger: 0.1 },
      ),
  });
  gsap.registerEffect({
    name: 'shake',
    defaults: { duration: 0.5, distance: 10 },
    extendTimeline: true,
    effect: (targets: gsap.TweenTarget, config: FxConfig) =>
      gsap.fromTo(
        targets,
        { x: -config.distance },
        { x: 0, duration: config.duration, ease: 'power1.out', backgroundColor: '#f2a33a', clearProps: 'backgroundColor' },
      ),
  });

  const cleanups: Array<() => void> = [];
  const ctx = gsap.context((self) => {
    const effects = gsap.effects as Record<string, (t: gsap.TweenTarget, c?: Partial<FxConfig>) => gsap.core.Tween>;
    if (preview) {
      // The same two effects, sequenced straight onto a timeline.
      // The boxes stay visible through the whole loop: a wave at the end replaces any fade-out.
      const tl = gsap.timeline({ repeat: -1 }) as FxTimeline;
      tl.popIn(boxes, { distance: 30 })
        .shake(boxes[1] ?? [], { distance: 24 }, '+=0.4')
        .shake(boxes[2] ?? [], { distance: 24 }, '<0.15')
        .to(boxes, { y: -14, duration: 0.25, stagger: 0.08, yoyo: true, repeat: 1 }, '+=0.3')
        .to({}, { duration: 0.6 });
      return;
    }

    const note = document.createElement('p');
    note.className = 'readout';
    note.textContent = 'Effects registered: popIn (defaults duration 0.5) and shake (distance 10).';
    const controls = document.createElement('div');
    controls.className = 'controls';
    // Handlers run outside the context, so wrap them to keep their tweens revertible.
    const inCtx = <A extends unknown[]>(name: string, fn: (...a: A) => void): ((...a: A) => void) =>
      self.add(name, fn) as (...a: A) => void;
    const btn = (text: string, name: string, fn: () => void): void => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = text;
      b.addEventListener('click', inCtx(name, fn));
      controls.append(b);
    };
    const slow = (): Partial<FxConfig> => ({ duration: 1.2 });
    btn('gsap.effects.popIn(boxes)', 'clickPop', () => effects.popIn?.(boxes));
    btn('popIn with {duration: 1.2}', 'clickPopSlow', () => effects.popIn?.(boxes, slow()));
    btn('gsap.effects.shake(box 1)', 'clickShake', () => effects.shake?.(boxes[0] ?? [], { distance: 24 }));
    btn('tl.popIn().shake().shake()', 'clickChain', () => {
      const tl = gsap.timeline() as FxTimeline;
      tl.popIn(boxes, { distance: -30 }).shake(boxes[1] ?? [], {}, '+=0.2').shake(boxes[3] ?? [], { distance: 30 }, '<0.2');
    });
    const onRow = inCtx('clickRow', (e: MouseEvent): void => {
      const hit = e.target instanceof HTMLElement && boxes.includes(e.target) ? e.target : undefined;
      if (hit) effects.shake?.(hit);
    });
    row.addEventListener('click', onRow);
    el.append(controls, note);
    cleanups.push(() => {
      row.removeEventListener('click', onRow);
      controls.remove();
      note.remove();
    });
  }, el);

  return () => {
    for (const fn of cleanups) fn();
    ctx.revert();
  };
};

export default mount;
