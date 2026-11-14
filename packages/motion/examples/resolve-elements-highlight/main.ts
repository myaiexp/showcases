// A highlight() helper written with resolveElements: it accepts a selector, an element, a NodeList, an array or null
import { animate, delay, resolveElements, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="doc${preview ? '' : ' full'}">
      <h4 class="title">Release notes</h4>
      <ul class="list"><li>Faster start-up</li><li class="new">Dark mode</li><li>Fewer crashes</li><li class="new">Offline maps</li><li>Smaller download</li></ul>
      <p class="note">Thanks to everyone who reported bugs.</p>
    </div>
    <code class="call"></code>`;
  const call = el.querySelector<HTMLElement>('.call')!;
  let p: ReturnType<typeof panel> | undefined;

  const scope = scopeMotion(el, (s) => {
    // One function, any kind of target. resolveElements turns them all into an array of elements.
    // The second argument scopes selectors to a root; here the mount element, as the scope itself does.
    const highlight = (target: Parameters<typeof resolveElements>[0], label: string): void => {
      call.textContent = `highlight(${label})`;
      const found = resolveElements(target, { current: el, animations: [] });
      for (const [i, node] of found.entries()) {
        animate(node, { backgroundColor: ['rgba(255, 210, 74, 0)', 'rgba(255, 210, 74, 0.55)', 'rgba(255, 210, 74, 0)'] }, { duration: 1.2, delay: i * 0.12 });
      }
      if (!found.length) call.textContent += ' // nothing found, nothing happens';
    };

    const tries: [string, () => void][] = [
      ['".new"', () => highlight('.new', '".new"')],
      ['an element', () => highlight(el.querySelector('.title'), 'querySelector(".title")')],
      ['a NodeList', () => highlight(el.querySelectorAll('li:nth-child(odd)'), 'querySelectorAll("li:nth-child(odd)")')],
      ['an array', () => highlight([el.querySelector('.title'), el.querySelector('.note')].filter(Boolean) as Element[], '[title, note]')],
      ['null', () => highlight(el.querySelector('.missing'), 'querySelector(".missing")')],
    ];

    if (preview) {
      let n = 0;
      const tick = (): void => {
        tries[n++ % tries.length]![1]();
        delay(tick, 1.8);
      };
      delay(tick, 0.4);
    } else {
      hint(el, 'Each button calls the same highlight() with a different kind of target. resolveElements makes them all work, and a missing element quietly does nothing.');
      p = panel(el);
      for (const [name, run] of tries) p.button(name, s.bind(run));
    }
  });
  return () => { scope.cancel(); p?.dispose(); };
};

export default mount;
