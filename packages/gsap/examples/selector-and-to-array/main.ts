// Three identical components: a scoped selector() animates only one component's boxes, toArray() takes a scope too
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const NAMES = ['A', 'B', 'C'];

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'demo compact' : 'demo';
  const comps = NAMES.map((name) => {
    const comp = document.createElement('div');
    comp.className = 'comp';
    comp.dataset.name = name;
    comp.innerHTML = `<h4>Component ${name}</h4><div class="boxes">${[1, 2, 3]
      .map((n) => `<div class="box" data-id="${name}${n}">${name}${n}</div>`)
      .join('')}</div>`;
    root.append(comp);
    return comp;
  });
  const panel = document.createElement('pre');
  panel.className = 'panel';
  root.append(panel);
  el.append(root);

  const ctx = gsap.context(() => {
    // A selector function scoped to one component: only its descendants can match.
    const selectors = comps.map((c) => gsap.utils.selector(c));
    const scoped = (i: number): ((s: string) => HTMLElement[]) => selectors[i] as (s: string) => HTMLElement[];
    const bounce = { y: -18, scale: 1.2, duration: 0.3, stagger: 0.08, yoyo: true, repeat: 1, ease: 'power2.out' };

    // `.box` appears in every component, yet each call below touches three elements only.
    const lines = comps.map((c, i) => {
      const boxes = scoped(i)('.box'); // a real Array, not a NodeList
      return `selector(${NAMES[i] ?? ''})(".box") -> ${boxes.length} boxes: ${boxes.map((b) => b.dataset.id).join(', ')}`;
    });
    // toArray() with a scope: every descendant of the whole example
    const all = gsap.utils.toArray<HTMLElement>('.box', root);
    lines.push(`toArray(".box", root) -> ${all.length} boxes`);
    panel.textContent = lines.join('\n');

    if (preview) {
      // Preview: one timeline, built once, plays the components in turn.
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });
      comps.forEach((_, i) => tl.to(scoped(i)('.box'), bounce, i * 0.9));
      return;
    }
    // Full view: click a component and only its boxes move. Handlers run outside the context.
    comps.forEach((c, i) => {
      c.addEventListener('click', () => {
        gsap.to(scoped(i)('.box'), { ...bounce, overwrite: true });
      });
    });
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Click a component. The unscoped selector ".box" would also match the other two.';
    root.append(hint);
  }, el);

  return () => {
    gsap.killTweensOf(root.querySelectorAll('.box'));
    ctx.revert();
  };
};

export default mount;
