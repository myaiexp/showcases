// Layout properties: a live table of the AutoLayout instance fields before and after update()
import { createLayout } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = 'root row';
  const addItem = (n: number): HTMLElement => {
    const item = document.createElement('div');
    item.className = 'item';
    item.textContent = String(n);
    return item;
  };
  let count = 3;
  root.append(addItem(1), addItem(2), addItem(3));

  const layout = createLayout(root, {
    children: '.item',
    properties: ['borderRadius'],
    enterFrom: { opacity: 0, transform: 'scale(.5)' },
    leaveTo: { opacity: 0 },
  });
  layout.id = 'properties-demo';

  const table = document.createElement('pre');
  table.className = 'table';
  const show = (): void => {
    const nodes = (a: unknown[]): string => `${a.length} node${a.length === 1 ? '' : 's'}`;
    const rows: Array<[string, string]> = [
      ['root', `<${layout.root.tagName.toLowerCase()} class="${(layout.root as HTMLElement).className}">`],
      ['id', String(layout.id)],
      ['children', JSON.stringify(layout.children)],
      ['properties', JSON.stringify([...layout.properties])],
      ['enterFromParams', JSON.stringify(layout.enterFromParams)],
      ['leaveToParams', JSON.stringify(layout.leaveToParams)],
      ['timeline', (layout.timeline as unknown) ? 'Timeline' : 'null'],
      ['animating', nodes(layout.animating)],
      ['entering', nodes(layout.entering)],
      ['leaving', nodes(layout.leaving)],
      ['swapping', nodes(layout.swapping)],
    ];
    table.textContent = rows.map(([k, v]) => `${k.padEnd(16)}${v}`).join('\n');
  };

  const toggle = (): void => {
    layout.update(() => root.classList.toggle('row'));
    show();
  };
  const add = (): void => {
    layout.update(() => root.append(addItem(++count)));
    show();
  };

  show();
  let timer = 0;
  const controls: Array<[HTMLButtonElement, () => void]> = [];
  if (preview) {
    let n = 0;
    timer = window.setInterval(() => {
      if (n++ % 3 === 2 && root.children.length < 6) add();
      else toggle();
    }, 1300);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    ([['Toggle row', toggle], ['Add item', add]] as const).forEach(([label, fn]) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = label;
      b.addEventListener('click', fn);
      controls.push([b, fn]);
      panel.append(b);
    });
    el.append(panel);
  }
  el.prepend(root);
  el.append(table);

  return () => {
    window.clearInterval(timer);
    controls.forEach(([b, fn]) => b.removeEventListener('click', fn));
    layout.revert();
  };
};

export default mount;
