// Two identical widgets; a sequence in a scope rooted on one of them animates only that one
import { animate, scopeMotion } from 'motion';
import type { AnimationSequence } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const widget = (title: string): string => `
  <div class="widget"><b>${title}</b>
    <div class="bar a"></div><div class="bar b"></div></div>`;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `<div class="pair">${widget('Scoped (animates)')}${widget('Same selectors (still)')}</div>`;
  const root = el.querySelector<HTMLElement>('.widget')!;

  type Run = { scope: ReturnType<typeof scopeMotion>; timeline: ReturnType<typeof animate> };
  const start = (seconds: number): Run => {
    let timeline!: ReturnType<typeof animate>;
    // The root element makes `.a` and `.b` mean "inside this widget". The scope's
    // transition is merged under the sequence's own defaultTransition.
    const scope = scopeMotion(
      root,
      () => {
        const sequence: AnimationSequence = [
          ['.a', { x: [0, 80] }],
          ['.b', { x: [0, 120] }],
        ];
        if (preview) sequence.push(['.bar', { x: 0 }, { duration: 0.4, at: '+0.6' }]);
        timeline = animate(sequence, { defaultTransition: { ease: 'easeOut' }, repeat: preview ? Infinity : 0 });
      },
      { transition: { duration: seconds } },
    );
    return { scope, timeline };
  };

  let run = start(0.6);
  if (preview) return () => run.scope.cancel();

  let seconds = 0.6;
  const p = panel(el);
  const restart = (): void => {
    run.scope.cancel();
    run = start(seconds);
  };
  p.select('Scope transition (s)', ['0.2', '0.6', '1.2'] as const, '0.6', (v) => {
    seconds = Number(v);
    restart();
  });
  p.button('Replay', restart);
  p.button('Add a segment later', () => {
    // Added from outside the scope: it still resolves inside the root, and cancel() restores it.
    run.timeline.add(['.a', { backgroundColor: '#e0558a' }]);
  });
  hint(el, 'Both widgets have bars called .a and .b, but the scope is rooted on the left one so the right one never moves. The scope also supplies the duration; the sequence supplies the easing.');
  return () => {
    run.scope.cancel();
    p.dispose();
  };
};

export default mount;
