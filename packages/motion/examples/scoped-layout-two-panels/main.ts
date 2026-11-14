// One DOM update touches two panels; the scope passed to animateLayout picks which one glides
import { animateLayout, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const BARS = [['Inbox', '#7c5cff'], ['Drafts', '#2fc4b2'], ['Sent', '#ff7a59'], ['Trash', '#e5546b']] as const;
type Target = 'Left panel' | 'Right panel' | 'Both panels';

const mount: Mount = (el, { preview }) => {
  const side = (id: string): string => `
    <div class="side" data-side="${id}"><h4>${id}</h4>
      <div class="stack">${BARS.map(([n, c]) => `<div class="bar" data-layout style="background:${c}">${n}</div>`).join('')}</div>
    </div>`;
  el.innerHTML = `<div class="pair">${side('Left')}${side('Right')}</div>`;
  const [left, right] = [...el.querySelectorAll<HTMLElement>('.side')] as [HTMLElement, HTMLElement];
  let target: Target = 'Left panel';

  const run = (): void => {
    const scoped = target === 'Left panel' ? [left] : target === 'Right panel' ? [right] : [left, right];
    left.classList.toggle('scoped', scoped.includes(left));
    right.classList.toggle('scoped', scoped.includes(right));
    // Both panels are reversed here, but only the elements passed first are measured and animated.
    animateLayout(scoped, () => {
      for (const s of [left, right]) {
        const stack = s.querySelector('.stack') as HTMLElement;
        stack.append(...[...stack.children].reverse());
      }
    }, { type: 'spring', visualDuration: 0.5, bounce: 0.25 });
  };

  const scope = scopeMotion(el, () => {
    if (!preview) return;
    let n = 0;
    const tick = (): void => {
      target = n++ % 2 ? 'Right panel' : 'Left panel';
      run();
      delay(tick, 1.5);
    };
    delay(tick, 0.7);
  });
  if (preview) return () => scope.cancel();

  const p = panel(el);
  p.select('Animate', ['Left panel', 'Right panel', 'Both panels'] as const, target, (v) => { target = v; });
  p.button('Reverse both lists', () => scope.run(run));
  hint(el, 'The update reverses both lists every time. Change which panel is scoped, then press the button: the scoped one glides, the other snaps.');
  return () => {
    scope.cancel();
    p.dispose();
  };
};

export default mount;
